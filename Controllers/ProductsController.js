const helper = require('../services/helper');
const config = require('../services/config');
const db = require('../services/db');

const Product = require('../models/Product');
const User = require('../models/User');

class ProductsController {

    // Return all users on JSON format 
    static async getProducts(page = 1, response) {
        const offset = helper.getOffset(page, config.listPerPage);
        const rows = await db.query(
            `SELECT * FROM products LIMIT ${offset},${config.listPerPage}`
        );
        const data = helper.emptyOrRows(rows);
        const meta = { page };
        response.status(201).json({ data, meta });
    }

    static async getProductsUser (id, page, res) {
        const user = await User.find(id);
        if (user !== false) {
            const products = await user.getProducts();
            console.log(products);
            res.status(200).json(products);
        } else {
            res.status(401).json({ message: 'User not found' });
        }
    }

    static async create(request, response) {
        const product = Product.build(request);
        if (product.active) {
            const result = await product.save();
            if (result) {
                response.status(200).json({ message: 'Product created successfully' });
            } else {
                response.status(401).json({ message: 'Error during the process..' });
            }
        } else {
            response.status(401).json({ message: product });
        }
    }

    static async getProduct (id, response) {
        const product = await Product.find(id);
        if (product !== false) {
            response.status(200).json(product);
        } else {
            response.status(401).json({ message: 'Product not fount !' })
        }
    }

    static async delete (id, response) {
        const product = await Product.find(id);
        if (product) {
            const resultat = await product.delete();
            if (resultat !== null) {
                response.status(200).json({ message: 'Product deleted !', status: 200 });
            } else {
                response.status(400).json({ message: 'Error during the process..' });
            }
        } else {   
            response.status(400).json({ message: 'Product not found !' });
        }
    }
}


module.exports = ProductsController;