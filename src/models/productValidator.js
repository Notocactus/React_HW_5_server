const Joi = require("joi");

const productSchema = Joi.object({
    name: Joi.string().min(0).max(255).required().default("newItem"),
    description: Joi.string().min(0).max(1000).default(""),
    amount: Joi.number().positive().required(),
    unit: Joi.string().min(0).max(255).required().default(""),
    image: Joi.string().uri().default(""),
    price: Joi.number().positive().required(),
    categoryId: Joi.number().integer().positive().default(0)
});

const productIdSchema = Joi.object({
    id: Joi.number().integer().positive().required()
});

const paginationSchema = Joi.object({
    limit: Joi.number().integer().min(1).default(100),
    offset: Joi.number().integer().min(0).default(0)
});

module.exports = { productSchema, productIdSchema, paginationSchema };
