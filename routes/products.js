const express = require('express');
const router = express.Router();
const ProductsController = require('../Controllers/ProductsController');
const Auth = require('../middlewares/authenticateToken');

/* GET Products. */
router.get('/', Auth.authenticateToken, async function(req, res, next) {
  try { await ProductsController.getProducts(req.query.page, res) } 
  catch (err) {
    console.error(`Error while getting users`, err.message);
    next(err);
  }
});

/* GET all Products associated to user */
router.get('/:id', Auth.rootAuthentificationToken, async function(req, res, next) {
  try { await ProductsController.getProductsUser(req.params.id, req.query.page, res) }
  catch (err) {
    console.error(`Error while getting users`, err.message);
    next(err);
  }
});

module.exports = router;