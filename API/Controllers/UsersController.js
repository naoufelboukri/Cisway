const helper = require('../services/helper');
const config = require('../services/config');
const db = require('../services/db');
const jwt = require('jsonwebtoken');

const User = require('../models/User');


class UsersController {

    // Return all users on JSON format 
    static async getUsers(page = 1, response) {
        const offset = helper.getOffset(page, config.listPerPage);
        const rows = await db.query(
            `SELECT * FROM users LIMIT ${offset},${config.listPerPage}`
        );
        const data = helper.emptyOrRows(rows);
        const meta = { page };
        response.status(201).json(rows);
    }

    // Create new account
    static async register(request, response) {
        let status = 401;
        let output = { message: "Error during the process !" };
        const user = User.build(request);
        const resultEmail = await User.whereEmail(request.email);
        if (!resultEmail) {
            if (user.active) {
                const result = await user.save();
                if (result) {
                    status = 201;
                    output = user;
                }
            } else {
                status = 401;
                output = { message: user };
            }
        } else {
            status = 401;
            output = { message: "This email is already used !" };
        }
        response.status(status).json(output);
    }

    // // Sign in user
    static async login(request) {
        const result = await db.query(`SELECT email, password FROM users WHERE email = '${request.email}'`);
        if (result.length > 0) {
          const token = jwt.verify(result[0]['password'], process.env.ACCESS_TOKEN);
          if (request.password === token['password']) {
            const accessToken = jwt.sign(request, process.env.ACCESS_TOKEN, {
                expiresIn: '3h'
            });
            return { accessToken: accessToken, message: "Connection success", status: 200};
          } 
        }
        return{ message: 'Mail or password invalid !', status: 401};
    }

    // // Return all information
    static async me(request, response) {
        let result = await db.query(`SELECT * FROM users WHERE email = '${request}'`);
        response.status(200).json(result[0]);
    }

    // // Update information
    static async update(email, request, id, response) {
        let json = {
            message: 'User edited successfully !',
            status: 200
        };
        const userLogged = await User.whereEmail(email);
        const userTarget = await User.find(id);
        if (userTarget) {
            if (userLogged.id === id || userLogged.roleId === 1) {
                for (let index in request) {
                    if (index === 'username') { 
                        const newUsername = await userTarget.setUsername(request.username);
                        if (newUsername !== true) {
                            json.message = newUsername;
                            json.status = 401;
                        }
                    } 
                    if (index === 'password') {   
                        const newPassword = await userTarget.setPassword(request.password);
                        if (newPassword !== true) {
                            json.message = newPassword;
                            json.status = 401;
                        }
                    }
                    if (index === 'address') {  
                        const newAddress = await userTarget.setAddress(request.address);
                        if (newAddress !== true) {
                            json.message = newAddress;
                            json.status = 401;
                        }
                    }
                }
            } else {
                json.message = 'Error during the process';
                json.status = 401;
            }
        } else {
            json.message = 'User not found !';
            json.status = 401;
        }
        response.status(json.status).json(json);
    }

    // // Get Information of user (root)
    static async getUser(id, response) {
        // const userLogged = await User.whereEmail(emailLogged);
        const user = await User.find(id);
        if (user.active) {
            response.status(200).json(user);
        } else {
            response.status(401).json({ message: 'User not found !' });
        }
    }

    // // Delete user (root)
    static async delete(id, email, response) {
        const userTarget = await User.find(id);
        const userLogged = await User.whereEmail(email);
        if (userTarget.active) {
            if (userLogged.id === Number(id) || userLogged.roleId === 1) {
                const resultat = userTarget.delete(id);
                if (resultat !== null) {
                    response.status(200).json({ message: 'User deleted successfully !' });
                } else {
                    response.status(401).json('Error during the process..');
                }
            } else {
                response.sendStatus(403);
            }
        } else {
            response.status(401).json({ message: 'User not found' });
        }
    }
}

module.exports = UsersController;