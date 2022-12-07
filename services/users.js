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
    success: false,
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
        response.success = true;
        response.message = 'User created successfully';
      }
    } else {
      return user.getStatus();
    }
  } else {
    response.message = "This email is already used !";
  }
  return response;
}

async function login(infos) {
  
  const email = await db.query(`SELECT email, password FROM users WHERE email = '${infos.email}'`);
  if (email.length > 0) {
    let token = jwt.verify(email[0]['password'], process.env.ACCESS_TOKEN);
    if (infos.password === token['password']) {
      const accessToken = jwt.sign(infos, process.env.ACCESS_TOKEN);
      return { accessToken: accessToken }
    } else {
      return { message: 'Connection failed' };
    }
  }
  return { message: 'Cette adresse n\'existe pas !' }
}

module.exports = {
  getMultiple,
  create,
  login
}