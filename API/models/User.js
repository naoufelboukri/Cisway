const helper = require('../services/helper');
const jwt = require('jsonwebtoken');
const db = require('../services/db');

class User {
    constructor (username, password, email, address, roleId = 2, id = null) { 
        this.username = username;
        this.password = password;
        this.email = email;
        this.address = address;
        this.roleId = roleId;
        if (id !== null) {
            this.id = id;
        }
        this.active = true;
    }

    static build (params) {
        const controlUsername = helper.validate('username', params.username, ['required', 'length(4,255)']);
        const controlPassword = helper.validate('password', params.password, ['required', 'password']);
        const controlEmail = helper.validate('email', params.email, ['required', 'email']);
        const controlAddress = helper.validate('address', params.address, ['required', 'length(5,255)']);
        const controlRoleId = helper.validate('role', Number(params.role_id), ['int']);
        if (controlUsername !== true) { return controlUsername }
        if (controlPassword !== true) { return controlPassword }
        if (controlEmail !== true) { return controlEmail }
        if (controlAddress !== true) { return controlAddress }
        if (controlRoleId !== true) { return controlRoleId }
        return new User(params.username, params.password, params.email, params.address, params.role_id, params.id);
    }

    static async find(id) {
        const user = await db.query(`SELECT * FROM users WHERE id = ${id}`);
        if (user.length > 0) {
            return User.build(
            {
                id: user[0]['id'],
                username: user[0]['username'], 
                password: user[0]['password'], 
                email: user[0]['email'], 
                address: user[0]['address'], 
                role_id: user[0]['role_id'],
            });
        }
        return false;
    }

    static async whereEmail(email) {
        const user = await db.query(`SELECT * FROM users WHERE email = '${email}'`);
        if (user.length > 0) {
            return User.build(
            {
                id: user[0]['id'],
                username: user[0]['username'], 
                password: user[0]['password'], 
                email: user[0]['email'], 
                address: user[0]['address'], 
                role_id: user[0]['role_id'],
            });
        }
        return false;
    }

    async save() {
        const result = await db.query(
            `INSERT INTO users 
            (username, password, email, address, role_id)
            VALUES
            ("${this.username}", "${hashPassword(this.password)}", "${this.email}", "${this.address}", ${this.roleId});`
        );  
        if (result.affectedRows) {
              const id = await db.query(`SELECT id FROM users WHERE email = '${this.email}'`);
              this.id = id[0].id;
              return true;
          }
        return false;
    }

    async delete() {
        const result = await db.query(`DELETE FROM users WHERE id = ${this.id}`);
        return (result.affectedRows > 0) ? 'User deleted' : null;
    }

    async setUsername(username) {
        let output = helper.validate('username', username, ['required', 'length(4-255)']);
        if (output === true) {
            const result = await db.query(`UPDATE users SET username = "${username}" WHERE email = '${this.email}'`);
            if (!result.affectedRows) {
                output = 'Error during the process';
            } else {
                this.username = username;
            }
        }
        return output;
    }

    async setPassword(password) {
        let output = helper.validate('password', password, ['required', 'password']);
        if (output === true) {
            const result = await db.query(`UPDATE users SET password = "${hashPassword(password)}" WHERE email = '${this.email}'`);
            if (!result.affectedRows) {
                output = 'Error during the process';
            } else {
                this.password = password;
            }
        }
        return output;
    }

    async setAddress(address) {
        let output = helper.validate('address', address, ['required', 'length(4-255)']);
        if (output === true) {
            const result = await db.query(`UPDATE users SET address = "${address}" WHERE email = '${this.email}'`);
            if (!result.affectedRows) {
                output = 'Error during the process';
            } else {
                this.address = address;
            }
        }
        return output;
    }

    async getProducts() {
        const result = await db.query(`
            SELECT products.*
            FROM products 
            INNER JOIN product_user ON products.id = product_user.product_id 
            INNER JOIN users ON users.id = product_user.user_id 
            WHERE users.id = ${this.id}
        `);
        // const output = {};
        // Object.assign(output, result);
        return result;
    }

    async hasProduct(productId) {
        const request = await db.query(`
        SELECT id 
        FROM product_user 
        WHERE product_id = ${productId}
        AND user_id = ${this.id}`);

        return request.length > 0;
    }
}

function hashPassword(pass) {
    return jwt.sign({password: pass}, process.env.ACCESS_TOKEN);
}
module.exports = User;
