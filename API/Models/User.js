const DB = require('../db.config');

class User {
    constructor (username, password, email, address, roleId) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.address = address;
        this.roleId = roleId;
    }
    
    // Users.username
    set setUsername(value) {
        this.username = value;
    }

    // // Users.password
    set setPassword(password) {
        this.password = password;
    }

    // // Users.email
    set setEmail(email) {
        this.email = email;
    }
    // // Users.address
    set setAddress(address) {
        this.address = address;
    }

    // // Users.roleId
    set setRoleId(roleId) {
        this.roleId = roleId;
    }

    save () {
        console.log('This entity has to be registered.');
    }
}

module.exports = User;