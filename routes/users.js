const express = require('express');
const router = express.Router();

const UsersController = require('../Controllers/UsersController');
const Auth = require('../middlewares/authenticateToken');

/* GET users. */
router.get('/' , async function(req, res, next) {
  try { await UsersController.getUsers(req.query.page, res) } 
  catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});

router.post('/register', async function(req, res, next) {
  try { await UsersController.register(req.body, res) } 
  catch (err) {
    console.error(`Error while creating user`, err.message);
    next(err);
  }
});

router.post('/login', async function(req, res, next) {
  try { 
    let response = await UsersController.login(req.body); 
    res.status(response.status).json(response); 
  } 
  catch(err) {
    console.error(`Error while loging user`, err.message);
    next(err);
  }
})

router.get('/me', Auth.authenticateToken, async function(req, res, next) {
  try { await UsersController.me(req.user['email'], res) } 
  catch(err) {
    console.error(`Error while loging user`, err.message);
    next(err);
  }
})

router.put('/:id', async function (req, res, next) {
  try {
    const response = await users.update(req.params.id, req.body);
    res.status(201).json(response);
  } catch (err) {
    console.error(`Error while loging user`, err.message);
    next(err);
  }
})

module.exports = router;