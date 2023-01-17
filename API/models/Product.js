const helper = require('../services/helper');
const db = require('../services/db');

class Product {
    constructor (name, price, description, userId, id = null) { 
        if (id !== null) {
            this.id = id;
        }
        this.name = name;
        this.price = price;
        this.description = description;
        this.userId = userId;
        this.active = true;
    }

    static build (params, userId) {
        const controlName = helper.validate('name', params.name, ['required', 'length(2,255)']);
        const controlPrice = helper.validate('price', params.price, ['required', 'number']);
        const controlDescription = helper.validate('description', params.description, ['required']);
        if (controlName !== true) { return controlName }
        if (controlPrice !== true) { return controlPrice }
        if (controlDescription !== true) { return controlDescription }

        return new Product(params.name, params.price, params.description, userId, params.id);
    }

    static async find(id) {
        const product = await db.query(`SELECT * FROM products WHERE id = ${id}`);
        if (product.length > 0) {
            return Product.build(
            {
                id: product[0]['id'],
                name: product[0]['name'], 
                price: product[0]['price'], 
                description: product[0]['description']
            }, product[0]['user_id']);
        }
        return false;
    }

    static async getProduct(id) {
        const result = await db.query(
            `SELECT products.id, products.name, products.description, products.price, users.username 
            FROM products
            JOIN users ON products.user_id = users.id
            WHERE products.id = ${id};`
        );
        return result[0];
    }

    async save() {
        const result = await db.query(
            `INSERT INTO products 
            (name, price, description, user_id)
            VALUES
            ("${this.name}", "${this.price}", "${this.description}", ${this.userId});`
        );  
  
        this.id = result.insertId;
        return (result.affectedRows) ? true : false;
    }

    async delete() {
        const result = await db.query(`DELETE FROM products WHERE id = ${this.id}`);
        return (result.affectedRows > 0) ? 'User deleted' : null;
    }

    async setName(name) {
        let output = helper.validate('name', name, ['required', 'length(2-255)']);
        if (output === true) {
            const result = await db.query(`UPDATE products SET name = '${name}' WHERE id = '${this.id}'`);
            if (!result.affectedRows) {
                output = 'Error during the process';
            } else {
                this.name = name;
            }
        }
        return output;
    }

    async setPrice(price) {
        let output = helper.validate('price', price, ['required', 'number']);
        if (output === true) {
            const result = await db.query(`UPDATE products SET price = '${price}' WHERE id = '${this.id}'`);
            if (!result.affectedRows) {
                output = 'Error during the process';
            } else {
                this.price = price;
            }
        }
        return output;
    }

    async setDescription(description) {
        let output = helper.validate('description', description, ['required']);
        if (output === true) {
            const result = await db.query(`UPDATE products SET description = '${description}' WHERE id = '${this.id}'`);
            if (!result.affectedRows) {
                output = 'Error during the process';
            } else {
                this.description = description;
            }
        }
        return output;
    }
}

module.exports = Product;
