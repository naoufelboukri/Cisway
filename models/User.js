const helper = require('../helper');
const jwt = require('jsonwebtoken');
class User {
    constructor (username, password, email, address, roleId = 2) {
        let controls = helper.objectValidation({
            username: [username, ['required', 'length(3,255)']],
            password: [password, ['required', 'password']],
            email: [email, ['required', 'email']],
            address: [address, ['required']],
            roleId: [roleId, ['int']],
        });
        console.log(controls);
        this.username = username;
        this.password = password;
        this.email = email;
        this.address = address;
        this.roleId = roleId;
    }
}

function hashPassword() {

}

module.exports = User;
