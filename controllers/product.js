const Product = require('../models/product');
const slugify = require('slugify');
const f = require('formidable');
const fs= require('fs');

exports.createProduct = (req,res) => {


        // const {product_name, Model_Number,product_color,photos, product_size, product_country,product_quantity,product_price,product_description} = req.body;
        var form = new f.IncomingForm();

        form.multiples = true;
        form.keepExtensions = true;
        
        form.parse(req, (err,fields,files) => {

         
                const {shipping,category,brand,product_name,product_color,product_price,product_description,product_size,Model_Number,product_country,product_quantity} = fields;

                if (product_name === ""){
                        return res.status(400).json({
                                error: "Product Name is mandatory"
                        })        
                }
            
                if (Model_Number === "" || product_color === ""){
                        return res.status(400).json({
                                error: "Model Number and Product Color is mandatory"
                        })        
                }

                 
                if (product_size === ""){
                        return res.status(400).json({
                                error: "Product Size is mandatory"
                        })        
                } 
                
                if (product_quantity === 0){
                        return res.status(400).json({
                                error: "Product Quantity is mandatory"
                        })        
                } 

                if (product_country === ""){
                        return res.status(400).json({
                                error: "Product Country is mandatory"
                        })        
                }

                if (product_price === 0.0){
                        return res.status(400).json({
                                error: "Product Price is mandatory"
                        })       
                }

                if (product_description === "" || product_description.length < 20){
                        return res.status(400).json({
                                error: "Product Description is mandatory && should be 20 charecters long"
                        })        
                }
                

                let product = new Product({
                        product_name,
                        product_color,
                        product_description,
                        product_size,
                        Model_Number,
                        shipping, 
                        category, 
                        brand
                
                });
                
                product.slug = slugify(product_name)
                product.product_quantity = parseInt(product_quantity);
                product.product_price = parseFloat(product_price);
                

                
                // slug = slugify(product_name);

                Product.findOne({slug:  product.slug}).exec((err, data) => {
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
        
                if (files.photos){
                        files.photos.forEach(file => {
                                if (file.size >  1000000){
                                        return res.status(400).send("Image can not be larger than 1MB");
                                }

                                product.photos.push({
                                        photoName: file.name, 
                                        data: fs.readFileSync(file.path),
                                        contentType: file.type
                                }) 
                        })
                }

                product.save((err, result) => {
                        if (err){
                                return res.status(400).json({
                                        error: err
                                })  
                        }

                        res.status(200).json({
                                message: "product created successfully"
                        })
                })

                
        })
   
}


exports.read = (req,res) => {

        let products

        Product.find({})
        .populate('category', 'category_name slug')
        .populate('brand', 'brand_name slug')
        .exec((err,data) => {
                products = data;                
                res.status(200).json({
                        products
                })
        })
        
}

exports.photo = (req,res) => {
        const productId = req.params.productId;
        const imageName = req.params.imageName;

        Product.findOne({_id: productId}).exec((err, product) => {
            if (err || !product){
                return res.status(404).json({
                    error: 'Product not found'
                })
            }
    
            product.photos.forEach(file => {
                if (file.data && file.photoName === imageName) {
                        res.set('Content-Type', file.contentType);
                        return res.send(file.data);
                }
            })
          
        })
}


exports.updateProduct = (req,res) => {
        
}

exports.readProduct = (req,res) => {
        const productId = req.params.productId;

        let product 

        Product.findOne({_id: productId}).exec((err, data) => {
                if (err || !data){
                        return res.status(404).json({
                            error: 'Product not found'
                        })
                }

                product = data
                res.status(200).json({
                        product
                })      
        })       
}