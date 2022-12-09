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

/* POST user register */
router.post('/register', async function(req, res, next) {
  try { await UsersController.register(req.body, res) } 
  catch (err) {
    console.error(`Error while creating user`, err.message);
    next(err);
  }
});

/* POST user login */
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

/* GET user info */
router.get('/me', Auth.authenticateToken, async function(req, res, next) {
  try { await UsersController.me(req.user['email'], res) } 
  catch(err) {
    console.error(`Error while loging user`, err.message);
    next(err);
  }
})

/* PUT user Update */
router.put('/:id', Auth.authenticateToken, async function (req, res, next) {
  try {
    await UsersController.update(req.user['email'], req.body, Number(req.params.id), res);
  } catch (err) {
    console.error(`Error while loging user`, err.message);
    next(err);
  }
})

router.get('/get/:id', async function(req, res, next) {
  try { await UsersController.getUser(req.params.id, res) } 
  catch (err) {
    console.error(`Error while creating user`, err.message);
    next(err);
  }
})

router.delete('/delete/:id', async function(req, res, next) {
  try { 
    const response = await UsersController.delete(req.params.id, res) 
    res.status(response.status).json(response);
  }
  catch (err) {
    console.error(`Error while creating user`, err.message);
    next(err);
  }
})

module.exports = router;