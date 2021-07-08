const Product = require('../models/product');
const slugify = require('slugify');

exports.createProduct = (req,res) => {

        if (req.body.product_name === ""){
                return res.status(400).json({
                        error: "Product Name is mandatory"
                })        
        }

        if (req.body.Model_Number === "" || req.body.product_color === ""){
                return res.status(400).json({
                        error: "Model Number and Product Color is mandatory"
                })        
        }
        
        if (req.body.product_size === ""){
                return res.status(400).json({
                        error: "Product Size is mandatory"
                })        
        } 
        
        if (req.body.product_quantity === 0){
                return res.status(400).json({
                        error: "Product Quantity is mandatory"
                })        
        } 

        if (req.body.product_country === ""){
                return res.status(400).json({
                        error: "Product Country is mandatory"
                })        
        }

        if (req.body.product_price === 0){
                return res.status(400).json({
                        error: "Product Price is mandatory"
                })       
        }

        if (req.body.product_description === "" || req.body.product_description.length < 20){
                return res.status(400).json({
                        error: "Product Description is mandatory && should be 20 charecters long"
                })        
        }

        req.body.slug = slugify(req.body.product_name);

        Product.findOne({slug: req.body.slug}).exec((err, data) => {
                if (err){
                        return res.status(400).json({
                                error: err
                        })     
                }

                if (data){
                        return res.status(400).json({
                                error: "This Product already exsists"
                        })  
                }
        })
 
        const newProduct = new Product(req.body).save();

        res.status(200).json({
                newProduct,
                message: "Product created successfully!!"
        });
}