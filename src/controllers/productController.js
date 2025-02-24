// const Product = require("../database/Product");

// exports.createProduct = async (req, res) => {
//     try {
//         const { name, description, amount, unit, image, price, category } = req.body;
//         if (!name || !category || !description || !amount || !unit || !image || !price) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         const product = await Product.create(req.body);
//         res.status(201).json(product);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: error.message });
//     }
// }

// exports.getAllProducts = async (req, res) => {
//     try {
//         const limit = req.query.limit || 100;
//         const offset = req.query.offset || 0;

//         const products = await Product.getAll(limit, offset);
//         res.status(200).json(products);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: error.message });
//     }
// }

// exports.getProductById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         if (!id) {
//             return res.status(400).json({ message: "ID is required" });
//         }
//         if (!Number(id)) {
//             return res.status(400).json({ message: "ID must be a number" });
//         }

//         const product = await Product.getById(id);
//         if (!product) {
//             return res.status(404).json({ message: "Product not found" });
//         }
//         res.status(200).json(product);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: error.message });
//     }
// }

// exports.updateProduct = async (req, res) => {
//     try {
//         const { id } = req.params;
//         if (!id) {
//             return res.status(400).json({ message: "ID is required" });
//         }
//         if (!Number(id)) {
//             return res.status(400).json({ message: "ID must be a number" });
//         }
//         const { name, description, amount, unit, image, price, category } = req.body;
//         if (!name || !category || !description || !amount || !unit || !image || !price) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         const product = await Product.update(id, req.body);
//         if (!product) {
//             return res.status(404).json({ message: "Product not found" });
//         }
//         res.status(200).json(product);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: error.message });
//     }
// }

// exports.deleteProduct = async (req, res) => {
//     try {
//         const { id } = req.params;
//         if (!id) {
//             return res.status(400).json({ message: "ID is required" });
//         }
//         if (!Number(id)) {
//             return res.status(400).json({ message: "ID must be a number" });
//         }

//         const deleted = await Product.delete(id);
//         if (!deleted) {
//             return res.status(404).json({ message: "Product not found" });
//         }
//         res.status(200).json({ message: "Product deleted successfully" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: error.message });
//     }
// }


const Product = require("../database/Product");
const { productSchema, productIdSchema, paginationSchema } = require("../models/productValidator");

exports.createProduct = async (req, res) => {
    try {
        const { error, value } = productSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const product = await Product.create(value);
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const { error, value } = paginationSchema.validate(req.query);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const products = await Product.getAll(value.limit, value.offset);
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const { error, value } = productIdSchema.validate(req.params);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const product = await Product.getById(value.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const idValidation = productIdSchema.validate(req.params);
        if (idValidation.error) {
            return res.status(400).json({ message: idValidation.error.details[0].message });
        }

        const { error, value } = productSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const product = await Product.update(idValidation.value.id, value);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { error, value } = productIdSchema.validate(req.params);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const deleted = await Product.delete(value.id);
        if (!deleted) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};