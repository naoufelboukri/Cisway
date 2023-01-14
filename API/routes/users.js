const express = require('express');
const router = express.Router();

const UsersController = require('../Controllers/UsersController');
const Auth = require('../middlewares/authenticateToken');

/* PUT user Update */
router.put('/:id', Auth.authenticateToken, async function (req, res, next) {
  try {
    await UsersController.update(req.user['email'], req.body, Number(req.params.id), res);
  } catch (err) {
    console.error(`Error while loging user`, err.message);
    next(err);
  }
})

/* GET information of one unique user */
router.get('/:id', Auth.rootAuthentificationToken, async function(req, res, next) {
  try { await UsersController.getUser(req.params.id, res) } 
  catch (err) {
    console.error(`Error while creating user`, err.message);
    next(err);
  }
})

/* DELETE existing user */
router.delete('/:id', Auth.authenticateToken, async function(req, res, next) {
  try { await UsersController.delete(req.params.id, req.user['email'], res) }
  catch (err) {
    console.error(`Error while creating user`, err.message);
    next(err);
  }
})

module.exports = router;