const pool = require("./database");

class Category {
    static async create(data) {
        try {
            const { name } = data;
            const result = await pool.query(
                `INSERT INTO categories (name) VALUES ($1) RETURNING *`,
                [name]
            );
            return result.rows[0];
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getAll() {
        try {
            const result = await pool.query("SELECT * FROM categories");
            return result.rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getById(id) {
        try {
            const result = await pool.query("SELECT * FROM categories WHERE id = $1", [id]);
            return result.rows[0];
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async update(id, data) {
        try {
            const { name } = data;
            const result = await pool.query(
                `UPDATE categories SET name = $1 WHERE id = $2 RETURNING *`,
                [name, id]
            );
            return result.rows[0];
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async delete(id) {
        try {
            const result = await pool.query("DELETE FROM categories WHERE id = $1 RETURNING *", [id]);
            return result.rowCount === 1;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = Category;