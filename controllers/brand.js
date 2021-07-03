const Brand = require('../models/brand');
const slugify = require('slugify');


exports.createBrand = (req,res) => {
    const {brand_name} = req.body;
    
    if (brand_name === ""){
        return res.status(400).json({
            error: "Brand Name Is mandatory"
        })
    }
    const slug = slugify(brand_name);
    
    Brand.findOne({brand_name}).exec((err,data) => {
        if (data || err){
            return res.status(400).json({
                error: "Brand must be unique"
            })
        }

        const brand = new Brand({brand_name, slug});
    
        brand.save((err, result) => {
            if (err){
                return res.status(400).json({
                    error: "Brand couldn't be created !!! Try again"
                })
            }
    
            res.status(200).json({
                message: "Product Brand Created Successfully!!!"
            });
        })
    })

 
}

exports.ListBrands = (req,res) => {
    
    let brands

    Brand
    .find({})
    .select('brand_name slug created_on')
    .exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "Brands couldn't be found"
            }) 
        }

        brands = data;
        res.status(200).json({
            brands
        });
    })
}

exports.readBrand = (req,res) => {
    const slug = req.params.slug;

    let brand
    Brand
    .findOne({slug: slug})
    .select('brand_name slug _id')
    .exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "Brand couldn't be found"
            }) 
        }

        brand = data
        res.status(200).json({
            brand
        });
    })
}

exports.updateBrand = (req,res) => {
    const slug = req.params.slug;

    Brand
    .findOne({slug: slug})
    .exec((err, oldBrand) => {
        const {brand_name} = req.body;
        if (oldBrand.brand_name === brand_name) {
            return res.status(400).json({
                error: "Brand already exists"
            }) 
        }

        oldBrand.brand_name = brand_name;
        oldBrand.slug = slugify(oldBrand.brand_name);

        oldBrand.save((err,result) => {
            if (err) {
                return res.status(400).json({
                    error: "Brand couldn't be updated!!!! Try again"
                }) 
            }
    
            res.status(200).json({
                message: "Brand updated!!"
            });
        })
    })
}


exports.deleteBrand = (req,res) => {
    const slug = req.params.slug;

    Brand
    .findOneAndRemove({slug: slug})
    .exec((err, success) => {
        if (err) {
            return res.status(400).json({
                error: "Brand couldn't be deleted!!"
            }) 
        }

        res.status(200).json({
            message: "Brand deleted successfully!!"
        })
    })
}