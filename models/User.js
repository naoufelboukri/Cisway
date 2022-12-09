const helper = require('../helper');
const jwt = require('jsonwebtoken');
const db = require('../services/db');

class User {
    constructor (username, password, email, address, roleId = 2, id = null) {
        this.controls = helper.objectValidation({
            username: [username, ['required', 'length(3,255)']],
            password: [password, ['required', 'password']],
            email: [email, ['required', 'email']],
            address: [address, ['required']],
            roleId: [roleId, ['int']],
        });
        
        if (this.controls.success) {  
            this.infos = {
                username: username,
                password: hashPassword(password),
                email: email,
                address: address,
                roleId: roleId,
                id: (id === null) ? null : id
            };
        }
    }

    static build (params) {
        return new User(params.username, params.password, params.email, params.address, params.roleId, params.id);
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
                    roleId: user[0]['role_id'],
                });;
        } else {
            return null;
        }
    }
    static async whereEmail(email) {
        const user = await db.query(`SELECT * FROM users WHERE email = '${email}'`);
        if (user.length > 0) {
            return User.build(
                {
                    username: user[0]['username'], 
                    password: user[0]['password'], 
                    email: user[0]['email'], 
                    address: user[0]['address'], 
                    roleId: user[0]['role_id'],
                    id: user[0]['id'],
                });
        } else {
            return null;
        }
    }

    async save() {
        const result = await db.query(
            `INSERT INTO users 
            (username, password, email, address, role_id)
            VALUES
            ("${user.username}", "${user.password}", "${user.email}", "${user.address}", ${user.roleId});`
        );
        
        if (result.affectedRows) {
              const id = await db.query(`SELECT id FROM users WHERE email = '${email}'`);
              this.id = id[0].id;
              return { message: 'User created successfully', status: 201 };
          }
        return null;
    }

    async delete() {
        const result = await db.query(`DELETE FROM users
        WHERE id = ${this.infos.id}`);
        return (result.affectedRows > 0) ? 'User deleted':null;
    }

    async setUsername(username) {
        const result = db.query(`UPDATE users
        SET username = '${username}'
        WHERE id = ${this.id}`);
        console.log(result);
        if (result.affectedRows) {
            return 'User updated !';
        }
        return null;
    }

    async setPassword(pass) {
        const result = db.query(`UPDATE users
        SET password = '${hashPassword(pass)}'
        WHERE id = ${this.id}`);

        if (result.affectedRows) {
            return 'User updated !';
        }
        return null;
    }

    async setAddress(address) {
        const result = db.query(`UPDATE users
        SET address = '${address}'
        WHERE id = ${this.id}`);

        if (result.affectedRows) {
            return 'User updated !';
        }
        return null;
    }

    getStatus() {
        return this.controls;
    }
}

function hashPassword(pass) {
    return jwt.sign({password: pass}, process.env.ACCESS_TOKEN);
}

module.exports = User;
