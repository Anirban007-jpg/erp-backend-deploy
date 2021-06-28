const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    // username is a field name in the table User(users)
    category_name: {
        type: String,
        index: true,
        unique: true
    },
    slug: {
        type: String,
        index: true,
        unique: true
    },
    created_on : {
        type: Date,
        default: Date.now()
    },
    updated_on : {
        type: Date
    }
},{});

module.exports = mongoose.model('Category', categorySchema);