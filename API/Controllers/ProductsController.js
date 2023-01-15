const helper = require('../services/helper');
const config = require('../services/config');
const db = require('../services/db');

const Product = require('../models/Product');
const User = require('../models/User');

class ProductsController {

    // Return all users on JSON format 
    static async getProducts(page = 1, response) {
        const rows = await db.query(
            `SELECT products.*, users.username
            FROM products
            JOIN product_user ON products.id = product_user.product_id
            JOIN users ON product_user.user_id = users.id`
        );
        response.status(201).json(rows);
    }

    static async getProductsUser(id, page, res) {
        const user = await User.find(id);
        if (user !== false) {
            const products = await user.getProducts();
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

    static async update(request, id, email, response) {
        let json = {
            message: 'Product updated successfully',
            status: 200
        };
        const userLogged = await User.whereEmail(email);
        const product = await Product.find(id);
        if (await userLogged.hasProduct(id) || userLogged.roleId === 1) {
            if (product) {
                for (const index in request) {
                    if (index === 'name') {
                        const newName = await product.setName(request.name);
                        if (newName !== true) {
                            json.message = newName;
                            json.status = 401;
                        }
                    }
                    if (index === 'price') {
                        const newPrice = await product.setPrice(request.price);
                        if (newPrice !== true) {
                            json.message = newPrice;
                            json.status = 401;
                        }
                    }
                    if (index === 'description') {
                        const description = await product.setDescription(request.description);
                        if (description !== true) {
                            json.message = description;
                            json.status = 401;
                        }
                    }
                }
                if (json.status === 200) {
                    json.message = product;
                }
            } else {
                json.status = 401;
                json.message = 'Product not found';
            }
        } else {
            json.status = 401;
            json.message = 'Product not found';
        }
        response.status(json.status).json(json.message);
    }
}


module.exports = ProductsController;