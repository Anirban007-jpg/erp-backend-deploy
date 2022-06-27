const express = require('express');
const { Register,Login} = require('../controllers/auth');

const {userRegisterValidator, userSigninValidator} = require('../validators/auth');
const {runValidations} = require('../validators/index');

const router = express.Router();

// Create the Register route using validator functions
router.post("/register", userRegisterValidator, runValidations, Register);
router.post("/login", userSigninValidator, runValidations, Login);

module.exports = router;