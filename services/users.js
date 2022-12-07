const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const User = require('../models/User');

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
  let user = new User(infos.username, infos.password, infos.email, infos.address);
  
  // const result = await db.query(
  //   `INSERT INTO users 
  //   (username, password, email, address, role_id)
  //   VALUES
  //   ('${user.username}', '${user.password}', '${user.email}', '${user.address}', ${user.roleId});`
  // );

  // let message = 'Error in creating user';

  // if (result.affectedRows) {
  //   message = 'User created successfully';
  // }

  // return {message};
}

module.exports = {
  getMultiple,
  create
}