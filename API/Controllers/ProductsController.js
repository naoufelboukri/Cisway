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
        response.status(201).json(data);
    }

    static async getProductsUser(id, page, res) {
        const user = await User.find(id);
        if (user !== false) {
            const products = await user.getProducts();
            console.log(products);
            res.status(200).json(products);
        } else {
            res.status(401).json({ message: 'User not found' });
        }
    }

    static async create(request, response, email = null) {
        const userLogged = (email !== null) ? await User.whereEmail(email) : null;
        const product = Product.build(request);
        if (product.active) {
            const result = await product.save();
            const resultAssociation = await product.associate(userLogged.id);
            if (result && resultAssociation && userLogged !== null) {
                response.status(200).json({ message: 'Product created successfully' });
            } else {
                response.status(401).json({ message: 'Error during the process..' });
            }
        } else {
            response.status(401).json({ message: product });
        }
    }

    static async getProduct(id, response) {
        const product = await Product.find(id);
        if (product !== false) {
            response.status(200).json(product);
        } else {
            response.status(401).json({ message: 'Product not fount !' })
        }
    }

    static async delete(id, response) {
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

    static async update(request, id, response) {
        let json = {
            message: 'Product updated successfully',
            status: 200
        };

        const product = Product.find(id);
        if (product) {
            for (index in request) {
                if (index === 'name') {
                    const newName = await setName(request.name);
                    if (newName !== true) {
                        json.message = newName;
                        json.status = 401;
                    }
                }
                if (index === 'price') {
                    const newPrice = await setPrice(request.price);
                    if (newPrice !== true) {
                        json.message = newPrice;
                        json.status = 401;
                    }
                }
                if (index === 'description') {
                    const description = await setDescription(request.description);
                    if (description !== true) {
                        json.message = description;
                        json.status = 401;
                    }
                }
            }
        } else {
            json.status = 401;
            json.message = 'Product not found';
        }
        response.status(json.status).json(json);
    }
}


module.exports = ProductsController;