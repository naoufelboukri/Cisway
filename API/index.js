// --- IMPORT ---
const express = require('express');
const DB = require('./db.config');
const validator = require('validator');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// --- ENDPOINTS ---
app.post('/register',(req, res) => {
  let response = { 
    success: false,
    message: 'Error during the process'
  };
  let status = 200;

  if (validator.isLength(req.body.username, { min: 1, max: 255 })) { // username
    if (validator.isStrongPassword(req.body.password)) { // password
      if (validator.isEmail(req.body.email)) {
        if (!validator.isEmpty(req.body.address)) {
          
          let bonjour;
          DB.query("SELECT email FROM users ", function(err, result) {
            console.log(result[0].email);
            bonjour = result[0].email;
          });
          console.log(bonjour);

          response['message'] = 'All is ok !';
          status = 201;
        } else {
          response['message'] = 'Please enter a valid address !';
          status = 401;
        }
      } else {
        response['message'] = 'Please, enter a valid email !';
        status = 401;
      }
    } else {
      response['message'] = 'Please enter a valid password, it has to be more than 7 characters containing numbers upper case and lower case letters !';
      status = 401;
    }
  } else {
    response['message'] = 'Username has to be between 1 and 255 caracters !';
    status = 401;
  } 
  return res.status(status).json(response);
})

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
})

// let user = new User(
//   req.body.username,
//   req.body.password,
//   req.body.email,
//   req.body.address,
//   req.body.role_id
//   );