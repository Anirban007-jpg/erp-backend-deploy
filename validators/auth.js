const {check} = require('express-validator');


exports.userRegisterValidator = [
    check('PanNo').not().isEmpty().withMessage("Pan No is Mandatory").isLength({min :10}).withMessage("Length should be 10 long"),
    check('name').not().isEmpty().withMessage('Name is mandatory for registration!').isLength({max:20}).withMessage("Your name should be less than 20 charecters long"),
    check('email').not().isEmpty().withMessage('Email is mandatory').isEmail().withMessage('Email must be valid'),
    check('address').not().isEmpty().withMessage('Address is necessary').isLength({max: 80}).withMessage('Adress should be atmost 80 charecters'),
    check('mobile_no').not().isEmpty().withMessage('Mobile no is mandatory').isLength({max:11}).withMessage('Mobile number must be 11 digits long'),
    check('about').not().isEmpty().withMessage('Your Bio is necessary'),
    check('role').not().isEmpty().withMessage('Role of the user is necessary'),
    check('password').isLength({min:6}).withMessage('Password must be more or equal to 6 charecters').matches(/\d/).withMessage('Password must contain a number'),
];


exports.userSigninValidator = [
    check('PanNo').not().isEmpty().withMessage('Pan No is mandatory'),
    check('password').not().isEmpty().withMessage('Password is mandatory')
];

exports.dataverify = [
    check('current_deposits_savings_deposits').not().isEmpty().withMessage('Current Deposits amount is mandatory'),
    check('total_deposits').not().isEmpty().withMessage('Total Deposits amount is mandatory')
];


exports.dataverify1 = [
    // check('current_deposits').not().isEmpty().withMessage('Current Deposits amount is mandatory'),
    // check('savings_deposits').not().isEmpty().withMessage('Savings Deposits amount is mandatory')
];

// exports.forgotPasswordValidator = [
//     check('email').not().isEmpty().withMessage('Email is mandatory')
// ];


// exports.resetPasswordValidator = [
//     check('newPassword').not().isEmpty().withMessage('Password is mandatory').isLength({min:6}).withMessage("New Password must be at least 6 charecters long")
// ];