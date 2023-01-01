const mongoose = require("mongoose");
const Joi = require("joi");

const productSchema = new mongoose.Schema({
	userId: {type: String, required: true },
	name: { type: String, required: true },
	price: { type: String, required: true },
});


const Product = mongoose.model("product", productSchema);

const validate = (data) => {
	const schema = Joi.object({
		name: Joi.string().required().label("name"),
		price: Joi.string().required().label("price"),
		userId: Joi.string().required().label("userId")
	});
	return schema.validate(data);
};

module.exports = { Product, validate };