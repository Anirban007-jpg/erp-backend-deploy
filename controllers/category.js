const Category = require('../models/category');
const slugify = require('slugify');


exports.createCat = (req,res) => {
    const {category_name} = req.body;
    
    if (category_name === ""){
        return res.status(400).json({
            error: "Category Is mandatory"
        })
    }
    const slug = slugify(category_name);
    
    Category.findOne({category_name}).exec((err,data) => {
        if (data || err){
            return res.status(400).json({
                error: "Category must be unique"
            })
        }

        const category = new Category({category_name, slug});
    
        category.save((err, result) => {
            if (err){
                return res.status(400).json({
                    error: "Category couldn't be created !!! Try again"
                })
            }
    
            res.status(200).json({
                message: "Product Category Created Successfully!!!"
            });
        })
    })

 
}

exports.ListCategories = (req,res) => {
    
    let categories;

    Category
    .find({})
    .select('category_name slug created_on')
    .exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "Categories couldn't be found"
            }) 
        }

        res.status(200).json({
            categories: data
        });
    })
}

exports.readCat = (req,res) => {
    const slug = req.params.slug;

    Category
    .findOne({slug: slug})
    .select('category_name slug _id')
    .exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "Categories couldn't be found"
            }) 
        }

        res.status(200).json({
            data
        });
    })
}

exports.updateCat = (req,res) => {
    const slug = req.params.slug;

    Category
    .findOne({slug: slug})
    .exec((err, oldCat) => {
        const {category_name} = req.body;
        if (oldCat.category_name === category_name) {
            return res.status(400).json({
                error: "Category already exists"
            }) 
        }

        oldCat.category_name = category_name;
        oldCat.slug = slugify(oldCat.category_name);

        oldCat.save((err,result) => {
            if (err) {
                return res.status(400).json({
                    error: "Category couldnt be updated!!!! Try again"
                }) 
            }
    
            res.status(200).json({
                message: "Category updated!!"
            });
        })
    })
}


exports.deleteCat = (req,res) => {
    const slug = req.params.slug;

    Category
    .findOneAndRemove({slug: slug})
    .exec((err, success) => {
        if (err) {
            return res.status(400).json({
                error: "Category couldn't be deleted!!"
            }) 
        }

        res.status(200).json({
            message: "Category deleted successfully!!"
        })
    })
}