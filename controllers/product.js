const Product = require('../models/product');
const slugify = require('slugify');

exports.createProduct = async (req,res) => {
    try {
        console.log(err);
        req.body.slug = slugify(req.body.product_name);
        const newProduct = await new Product(req.body).save();
        res.status(200).json(newProduct);
    }catch(err){
        console.log(err);
        res.status(200).send("Create Product Failed");
    }
}