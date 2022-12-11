const express = require('express');
const router = express.Router();

const ProductsController = require('../Controllers/ProductsController');

/* GET Products. */
router.get('/' , async function(req, res, next) {
  try { await ProductsController.getProducts(req.query.page, res) } 
  catch (err) {
    console.error(`Error while getting users`, err.message);
    next(err);
  }
});

/* POST Create New Product */
router.post('/create', async function(req, res, next) {
  try { await ProductsController.create(req.body, res) }
  catch(err) {
    console.error(`Error while getting users`, err.message);
    next(err);
  }
})

module.exports = router;