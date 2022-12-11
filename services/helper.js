const validator = require('validator');

function getOffset(currentPage = 1, listPerPage) {
    return (currentPage - 1) * [listPerPage];
}
  
function emptyOrRows(rows) {
    if (!rows) {
        return [];
    }
    return rows;
}

function objectValidation(object) {
    let response = {
        success: true,
        message: 'All is ok',
    }   
    for (const value in object) {
        for (const rule of object[value][1]) {
            if (rule === 'required') {
                if (object[value][0] === null || validator.isEmpty(object[value][0])) {
                    response.success = false;
                    response.message = "The field '"+ value +"' is mandatory !";
                    return response;
                }
            } else if (rule === 'password') {
                if (!validator.isStrongPassword(object[value][0])) {
                    response.success = false;
                    response.message = "The field '"+ value +"' has to be more than 7 characters containing numbers upper case and lower case letters  !";
                    return response;
                }
            } else if (rule === 'email') {
                if (!validator.isEmail(object[value][0])) {
                    response.success = false;
                    response.message = "The field '"+ value +"' is incorrect ! Please enter a valid email.";
                    return response;
                }
            } else if (rule === 'int') {
                if (!Number.isInteger(object[value][0])) {
                    response.success = false;
                    response.message = "The field '"+ value +"' is incorrect ! Please enter a valid role.";
                    return response;
                }
            } else if (rule.match(/^length*/)) {
                let parameters = [...rule.matchAll(/(\d+)/g)];
                let min = parameters[0][0];
                let max = parameters[1][0];
                if (!validator.isLength(object[value][0], {min: min, max: max})) {
                    response.success = false;
                    response.message = "The field '"+ value +"' is incorrect ! It has to be between "+ min +" and "+ max +" caracters !";
                    return response;
                }
            }
        }
    }

    return response;
}

function validate (name, value, rules) {
    for (const rule of rules) {
        if (rule === 'required') {
            if (value === null || validator.isEmpty(value)) {
                return "The field '"+ name +"' is mandatory !";
            }
        } else if (rule === 'password') {
            if (!validator.isStrongPassword(value)) {
                return  "The field '"+ name +"' has to be more than 7 characters containing numbers upper case and lower case letters  !";
            }
        } else if (rule === 'email') {
            if (!validator.isEmail(value)) {
                return  "The field '"+ name +"' is incorrect ! Please enter a valid email.";
            }
        } else if (rule === 'int') {
            if (!Number.isInteger(value)) {
                return  "The field '"+ name +"' is incorrect ! Please enter a valid role.";
            }
        } else if (rule.match(/^length*/)) {
            let parameters = [...rule.matchAll(/(\d+)/g)];
            let min = parameters[0][0];
            let max = parameters[1][0];
            if (!validator.isLength(value, {min: min, max: max})) {
                return "The field '"+ name +"' is incorrect ! It has to be between "+ min +" and "+ max +" caracters !";
            }
        }
    }
    return true;
}

module.exports = {
    getOffset,
    emptyOrRows,
    objectValidation,
    validate
}