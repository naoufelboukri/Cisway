const helper = require('../services/helper');
const db = require('../services/db');

class Product {
    constructor (name, price, description, id = null/*, images = null*/) { 
        if (id !== null) {
            this.id = id;
        }
        this.name = name;
        this.price = price;
        this.description = description;
        this.active = true;
        // this.images = [];
        // for (const image of images) {
        //     this.images.push(image);
        // }
    }

    static build (params) {
        const controlName = helper.validate('name', params.name, ['required', 'length(2,255)']);
        const controlPrice = helper.validate('price', params.price, ['required', 'number']);
        const controlDescription = helper.validate('description', params.description, ['required']);
        if (controlName !== true) { return controlName }
        if (controlPrice !== true) { return controlPrice }
        if (controlDescription !== true) { return controlDescription }

        // let images = [];

        // if (params.image1 !== undefined) {
        //     const controlImage1 = helper.validate('image1', params.image1, ['length(1-255)']);
        //     if (controlImage1 !== true) { return controlImage1 }
        //     images.push(params.image1);
        // }
        // if (params.image2 !== undefined) {
        //     const controlImage2 = helper.validate('image2', params.image2, ['length(1-255)']);
        //     if (controlImage2 !== true) { return controlImage2 }
        //     images.push(params.image2);
        // }
        // if (params.image3 !== undefined) {
        //     const controlImage3 = helper.validate('image3', params.image3, ['length(1-255)']);
        //     if (controlImage3 !== true) { return controlImage3 }
        //     images.push(params.image3);
        // }

        // if (images.length === 0) {
        //     return new Product(params.name, params.price, params.description, params.id);
        // } else {
        //     return new Product(params.name, params.price, params.description, params.id, images);
        // }

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
                image1: product[0]['image'],
                image2: product[0]['image2'],
                image3: product[0]['image3'],
            });
        }
        return false;
    }

    async save() {
        // let imagesValue = '';
        // let imagesIndex = '';
        // const size = this.images.length;
        // const indexImage = [
        //     'image',
        //     'image2',
        //     'image3',
        // ];
        // for (let i = 0; i < size; i++) {
        //     imagesIndex += `, ${indexImage[i]}`;
        //     imagesValue += `, "${this.images[i]}"`;
        // }
        // const result = await db.query(
        //     `INSERT INTO products 
        //     (name, price, description ${imagesIndex})
        //     VALUES
        //     ("${this.name}", "${this.price}", "${this.description}" ${imagesValue});`
        // );
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
