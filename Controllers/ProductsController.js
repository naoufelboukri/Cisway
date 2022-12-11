const helper = require('../helper');
const config = require('../config');
const db = require('../services/db');

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

}


module.exports = ProductsController;