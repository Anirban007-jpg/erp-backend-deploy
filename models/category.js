const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    // username is a field name in the table User(users)
    category_name: {
        type: String,
        index: true,
        lowerCase: true
    },
    slug: {
        type: String
    },
    created_on : {
        type: Date,
        default: Date.now()
    }
},{});

module.exports = mongoose.model('Category', categorySchema);