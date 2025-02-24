// const Category = require('../database/Category');

// exports.createCategory = async (req, res) => {
//     try {
//         const { name } = req.body;
//         if (!name) {
//             return res.status(400).json({ error: 'Name is required' });
//         }
//         const category = await Category.create({ name });
//         res.status(201).json(category);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

// exports.getCategories = async (req, res) => {
//     try {
//         const categories = await Category.findAll();
//         res.status(200).json(categories);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

// exports.getCategoryById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         if (!id) {
//             return res.status(400).json({ error: 'ID is required' });
//         }
//         if (!Number(id)) {
//             return res.status(400).json({ error: 'ID must be a number' });
//         }

//         const category = await Category.getById(id);
//         if (!category) {
//             return res.status(404).json({ error: 'Category not found' });
//         }
//         res.status(200).json(category);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

// exports.updateCategory = async (req, res) => {
//     try {
//         const { id } = req.params;
//         if (!id) {
//             return res.status(400).json({ error: 'ID is required' });
//         }
//         if (!Number(id)) {
//             return res.status(400).json({ error: 'ID must be a number' });
//         }
//         const { name } = req.body;
//         if (!name) {
//             return res.status(400).json({ error: 'Name is required' });
//         }

//         const category = await Category.update(id, name);
//         if (!category) {
//             return res.status(404).json({ error: 'Category not found' });
//         }
//         res.status(200).json(category);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

// exports.deleteCategory = async (req, res) => {
//     try {
//         const { id } = req.params;
//         if (!id) {
//             return res.status(400).json({ error: 'ID is required' });
//         }
//         if (!Number(id)) {
//             return res.status(400).json({ error: 'ID must be a number' });
//         }
        
//         const deleted = await Category.delete(req.params.id);
//         if (!deleted) {
//             return res.status(404).json({ error: 'Category not found' });
//         }
//         res.status(200).json({ message: 'Category deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

const Category = require("../database/Category");
const { categorySchema, categoryIdSchema } = require("../models/categoryValidator");

exports.createCategory = async (req, res) => {
    try {
        const { error, value } = categorySchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const category = await Category.create(value);
        res.status(201).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.getAll();
        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const { error, value } = categoryIdSchema.validate(req.params);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const category = await Category.getById(value.id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const idValidation = categoryIdSchema.validate(req.params);
        if (idValidation.error) {
            return res.status(400).json({ message: idValidation.error.details[0].message });
        }

        const { error, value } = categorySchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const category = await Category.update(idValidation.value.id, value);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { error, value } = categoryIdSchema.validate(req.params);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const deleted = await Category.delete(value.id);
        if (!deleted) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
