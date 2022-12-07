const helper = require('../helper');
const jwt = require('jsonwebtoken');
const hash = require('../config').hash;

class User {
    constructor (username, password, email, address, roleId = 2) {
        this.controls = helper.objectValidation({
            username: [username, ['required', 'length(3,255)']],
            password: [password, ['required', 'password']],
            email: [email, ['required', 'email']],
            address: [address, ['required']],
            roleId: [roleId, ['int']],
        });
        
        if (this.controls.success) {   
            this.username = username;
            this.password = hashPassword(password);
            this.email = email;
            this.address = address;
            this.roleId = roleId;
        }
    }

    getStatus() {
        return this.controls;
    }
}

function hashPassword(pass) {
    return jwt.sign({password: pass}, hash);
}

module.exports = User;
