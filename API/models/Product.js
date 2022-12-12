const helper = require('../services/helper');
const db = require('../services/db');

class Product {
    constructor (name, price, description, id = null) { 
        if (id !== null) {
            this.id = id;
        }
        this.name = name;
        this.price = price;
        this.description = description;
        this.active = true;
    }

    static build (params) {
        const controlName = helper.validate('name', params.name, ['required', 'length(2,255)']);
        const controlPrice = helper.validate('price', params.price, ['required', 'number']);
        const controlDescription = helper.validate('description', params.description, ['required']);
        if (controlName !== true) { return controlName }
        if (controlPrice !== true) { return controlPrice }
        if (controlDescription !== true) { return controlDescription }
        return new Product(params.name, params.price, params.description, params.id);
    }

    static async find(id) {
        const product = await db.query(`SELECT * FROM products WHERE id = ${id}`);
        if (product.length > 0) {
            return Product.build(
            {
                id: product[0]['id'],
                name: product[0]['name'], 
                price: product[0]['price'], 
                description: product[0]['description'], 
            });
        }
        return false;
    }

    async save() {
        const result = await db.query(
            `INSERT INTO products 
            (name, price, description)
            VALUES
            ("${this.name}", "${this.price}", "${this.description}");`
        );  
        this.id = result.insertId;
        return (result.affectedRows) ? true : false;
    }

    async associate(idUser) {
        const result = await db.query(
            `INSERT INTO product_user 
            (product_id, user_id)
            VALUES
            (${this.id}, ${idUser});`
        );  
        return (result.affectedRows) ? true : false;
    }

    async delete() {
        const result = await db.query(`DELETE FROM products WHERE id = ${this.id}`);
        return (result.affectedRows > 0) ? 'User deleted' : null;
    }

    async setName(name) {
        let output = helper.validate('name', name, ['required', 'length(2-255)']);
        if (output === true) {
            const result = await db.query(`UPDATE products SET name = '${name}' WHERE email = '${this.name}'`);
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
            const result = await db.query(`UPDATE products SET price = '${price}' WHERE email = '${this.price}'`);
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
            const result = await db.query(`UPDATE products SET description = '${description}' WHERE email = '${this.description}'`);
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
