const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { hash } = require('../config');


async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM users LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(infos){
  let response = { 
    status: 400,
    message: 'Error in creating user'
  };

  const email = await db.query(`SELECT email FROM users WHERE email = '${infos.email}'`);
  if (email.length === 0) {
    let user = new User(infos.username, infos.password, infos.email, infos.address);
    if (user.getStatus().success) {
      const result = await db.query(
        `INSERT INTO users 
        (username, password, email, address, role_id)
        VALUES
        ("${user.username}", "${user.password}", "${user.email}", "${user.address}", ${user.roleId});`
      );

      if (result.affectedRows) {
        response.status = 201;
        response.message = 'User created successfully';
      }
    } else {
      response.message = user.getStatus().message;
      response.status = 401;
    }
  } else {
    response.message = "This email is already used !";
    response.status = 401;
  }
  return response;
}

async function login(infos) {
  
  const email = await db.query(`SELECT email, password FROM users WHERE email = '${infos.email}'`);
  if (email.length > 0) {
    let token = jwt.verify(email[0]['password'], process.env.ACCESS_TOKEN);
    if (infos.password === token['password']) {
      const accessToken = jwt.sign(infos, process.env.ACCESS_TOKEN);
      return { success: true, accessToken: accessToken }
    } else {
      return { success: false, message: 'The email or password incorrect' };
    }
  }
  return { message: 'Cette adresse n\'existe pas !' }
}

async function me(email) {
  const user = await db.query(`SELECT username, email, address, role_id FROM users WHERE email = '${email}'`);
  return user[0];
}

module.exports = {
  getMultiple,
  create,
  login,
  me
}