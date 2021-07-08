const express = require('express');


const { requireSignin, AuthMiddleware, DealerMiddleware, DealerAdminMiddleware,AdminMiddleware } = require('../controllers/auth');

// const {} = require('../controllers/category');
const { createProduct } = require('../controllers/product');

const router = express.Router();


// create product route
router.post('/product/create', requireSignin, DealerAdminMiddleware, createProduct);


module.exports = router;