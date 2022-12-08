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
                const result = await db.query(
                  `INSERT INTO users 
                  (username, password, email, address, role_id)
                  VALUES
                  ("${user.username}", "${user.password}", "${user.email}", "${user.address}", ${user.roleId});`
                );
          
                if (result.affectedRows) {
                    message = 'User created successfully';
                    status = 201;
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

    // Login
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

    // Me
    static async me(request, response) {
        let result = await db.query(`SELECT * FROM users WHERE email = '${request}'`);
        return result[0];
    }
}

module.exports = UsersController;