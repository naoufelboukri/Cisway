const express = require('express');
const router = express.Router();
const users = require('../services/users');
const authenticateToken = require('../middlewares/authenticateToken');

/* GET programming languages. */
router.get('/', authenticateToken, async function(req, res, next) {
  try {
    res.json(await users.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});

router.post('/login', async function(req, res, next) {
  try {
    res.json(await users.login(req.body));
  } catch(err) {
    console.error(`Error while loging user`, err.message);
    next(err);
  }
})

router.post('/register', async function(req, res, next) {
  try {
    res.json(await users.create(req.body));
  } catch (err) {
    console.error(`Error while creating user`, err.message);
    next(err);
  }
});

router.post('/hello', authenticateToken, function(req, res, next) {
  res.json(req.body);
})

module.exports = router;