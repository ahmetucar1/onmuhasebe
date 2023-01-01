const mongoose = require("mongoose");
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
});


const Customer = mongoose.model("customer", customerSchema);

const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("firstName"),
		lastName: Joi.string().required().label("lastName"),
	});
	return schema.validate(data);
};

module.exports = { Customer, validate };