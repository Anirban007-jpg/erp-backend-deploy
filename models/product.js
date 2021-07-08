const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema({
    // username is a field name in the table User(users)
    category: {
        type: ObjectId,
        ref: "Category"
    },
    brand : {
        type: ObjectId,
        ref: "Brand"
    },
    product_name: {
        type: String,
        index: true,
        lowerCase: true
    },
    slug: {
        type: String,
        lowercase: true,
        index:true
    },
    Model_Number : {
        type: String  
    },
    product_description : {
        type: String
    },
    product_color : {
        type: String
    },
    product_size : {
        type: String
    },
    product_quantity : {
        type: Number
    },
    product_sold : {
        type: Number,
        default: 0
    },
    product_country : {
        type: String
    },
    product_price : {
        type: Number
    },
    entry_on : {
        type: Date,
        default: Date.now()
    },
    updated_on : {
        type: Date
    },
    // photos
    shipping : {
        type: String,
        enum : ["Yes","No"]
    },
    // photos : {
    //     type: Array
    // },
    // ratings : [
    //     {
    //         star: Number,
    //         postedBy : {type: ObjectId, ref: "User"}
    //     }
    // ]
},{});

module.exports = mongoose.model('Product', productSchema);