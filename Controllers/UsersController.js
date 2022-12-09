const helper = require('../helper');
const config = require('../config');
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
        response.status(201).json({ data, meta });
    }

    // Create new account
    static async register(request, response) {
        let message = 'Error during the process..';
        let status = 401;

        const resultEmail = await db.query(`SELECT email FROM users WHERE email = '${request.email}'`);
        if (resultEmail.length === 0) {
            const user = new User(request.username, request.password, request.email, request.address);
            if (user.getStatus().success) {
                const result = await user.save();
                if (result !== null) {
                    message = result.message;
                    status = result.status;
                }
            } else {
                message = user.getStatus().message;
                status = 401;
            }
        } else {
            message = "This email is already used !";
            status = 401;
        }
        response.status(status).json(message);
    }

    // Sign in user
    static async login(request) {
        const result = await db.query(`SELECT email, password FROM users WHERE email = '${request.email}'`);
        if (result.length > 0) {
          const token = jwt.verify(result[0]['password'], process.env.ACCESS_TOKEN);
          if (request.password === token['password']) {
            const accessToken = jwt.sign(request, process.env.ACCESS_TOKEN);
            return { accessToken: accessToken, message: "Connection success", status: 200};
          } 
        }
        return{ message: 'Mail or password invalid !', status: 401};
    }

    // Return all information
    static async me(request, response) {
        let result = await db.query(`SELECT * FROM users WHERE email = '${request}'`);
        return result[0];
    }

    // Update information
    static async update(email, request, id, response) {
        let json = {
            message: 'Error during the process',
            status: 403
        };
        const user = await User.whereEmail(email);
        if (user) {
            if (user.id === id) {
                for (const index in request) {
                    if (index === 'username') {
                        await user.setUsername(request.username);
                    } else if (index === 'password') {
                        await user.setPassword(request.password);
                    } else if (index == 'address') {
                        await user.setAddress(request.address);
                    }
                }
                json.status = 200;
                json.message = 'All is ok';
            } else {
                json.message = 'Access Denied';
            }
        }
        // Object.assign(request, {email: email});
        response.status(json.status).json(json);
    }

    // Get Information of user (root)
    static async getUser(id, response) {
        const user = await User.find(id);
        response.status(200).json(user.infos);
    }
}

module.exports = UsersController;