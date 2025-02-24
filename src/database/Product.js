const pool = require("./database");

class Product {
    static async create(data) {
        try {
            const { name, description, amount, unit, image, price, category } = data;
            const result = await pool.query(
                `INSERT INTO products (name, description, amount, unit, image, price, categoryId) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
                [name, description, amount, unit, image, price, category]
            );
            return result.rows[0];
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getAll(limit, offset) {
        try {
            const result = await pool.query("SELECT * FROM products LIMIT $1 OFFSET $2", [limit, offset]);
            return result.rows;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getById(id) {
        try {
            const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
            return result.rows[0];
        } catch (error) {
            console.error(error);
            throw error;
        }
    }   

    static async update(id, data) {
        try {
            const { name, description, amount, unit, image, price, category } = data;
            const result = await pool.query(
                `UPDATE products SET name = $1, description = $2, amount = $3, unit = $4, image = $5, price = $6, categoryId = $7 WHERE id = $8 RETURNING *`,
                [name, description, amount, unit, image, price, category,id]
            );
            return result.rows[0];
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async delete(id) {
        try {
            const result = await pool.query("DELETE FROM products WHERE id = $1 RETURNING *", [id]);
            return result.rowCount === 1;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = Product