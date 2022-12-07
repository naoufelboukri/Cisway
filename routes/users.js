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

router.post('/register', async function(req, res, next) {
  try {
    const response = await users.create(req.body); 
    res.status(response.status).json(response.message);
  } catch (err) {
    console.error(`Error while creating user`, err.message);
    next(err);
  }
});

router.post('/login', async function(req, res, next) {
  try {
    const response = await users.login(req.body);
    if (response.success){
      res.status(202).json(response.accessToken);
    } else {
      res.status(401).json(response.message);
    }
  } catch(err) {
    console.error(`Error while loging user`, err.message);
    next(err);
  }
})

router.get('/me', authenticateToken, async function(req, res, next) {
  try {
    res.status(202).json(await users.me(req.user['email']));
  } catch(err) {
    console.error(`Error while loging user`, err.message);
    next(err);
  }
})

router.post('/hello', authenticateToken, function(req, res, next) {
  res.json(req.body);
})

module.exports = router;