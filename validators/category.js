const {check} = require('express-validator');

exports.categoryCreateValidator = [
    check('category_name').not().isEmpty().withMessage('Category Name is mandatory')
];