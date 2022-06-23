const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // username is a field name in the table User(users)
    PanNo: {
        type: String,
        trim: true,
        upperCase: true
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        index: true
    },
    address: {
        type: String
    },
    about: {
        type: String,
        // default: 'You can change your information in update page of user'
    },
    profile: {
        type: String
    },
    mobile_no: {
        type: String
    },
    role: {
        type: String,
        // default: "Customer"
    },
    Sex : {
        type: String
    },
    profilepic: {
        data: Buffer,
        contentType: String
    },
    password: {
        type: String
    },
    verification_code: {
        type: Number
    },
    email_verified : {
        type: Number,
        default: 0
    },
    registered_on: {
        type: Date,
        default: Date.now()
    },
    Acknowledgement_No:{
        type: String, 
        trim: true,
        upperCase: true
    },
    updated_on: {
        type: Date
    },
    resetPasswordLink : {
        type: String,
        default: ''
    }
},{});

module.exports = mongoose.model('User', userSchema);