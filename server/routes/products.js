const router = require("express").Router();
const { Product, validate } = require("../models/product");


router.post("/products", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });
            
		const { success } = validate(req.body);
		if (success)
			return res.status(201).send({ message: success.details[0].message });	

		await new Product({ ...req.body }).save();
		res.status(201)
		.send({ message: "Ürün Kaydedildi" });
		console.log("Product created successfully");
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});



router.get("/products", async (req, res) => {
    try {
	  const products = await Product.find()
	  res.json(products)
	} catch (error) {
		res.json({message: error})
	}
});


router.get('/products/:id', async (req, res) => {
    try {
        const products = await Product.findById({ _id: req.params.id });
        res.json(products)
    } catch (error) {
        res.json({message: error})
    }
});

module.exports = router;