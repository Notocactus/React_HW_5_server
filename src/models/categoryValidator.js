const Joi = require("joi");

const categorySchema = Joi.object({
    name: Joi.string().min(0).max(255).required()
});

const categoryIdSchema = Joi.object({
    id: Joi.number().integer().positive().required()
});

module.exports = { categorySchema, categoryIdSchema };
