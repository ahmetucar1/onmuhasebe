const router = require("express").Router();
const { Customer, validate } = require("../models/customer");


router.post("/customers", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });
            
		const { success } = validate(req.body);
		if (success)
			return res.status(201).send({ message: success.details[0].message });	

		const customer = await Customer.findOne({ firstName: req.body.firstName } && { lastName: req.body.lastName });
		if (customer)
			return res
				.status(409)
				.send({ message: "Customer with given already Exist!" });


		await new Customer({ ...req.body }).save();
		res.status(201)
		.send({ message: "Müşteri Kaydedildi" });
		console.log("Customer created successfully");
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});



router.get("/customers", async (req, res) => {
    try {
	  const customers = await Customer.find()
	  res.json(customers)
	} catch (error) {
		res.json({message: error})
	}
});


router.get('/customers/:id', async (req, res) => {
    try {
        const customers = await Customer.findById({ _id: req.params.id });
        res.json(customers)
    } catch (error) {
        res.json({message: error})
    }
});

module.exports = router;