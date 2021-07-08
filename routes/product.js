const express = require('express');


const { requireSignin, AuthMiddleware, DealerMiddleware, DealerAdminMiddleware,AdminMiddleware } = require('../controllers/auth');

// const {} = require('../controllers/category');
const { createProduct, read } = require('../controllers/product');

const router = express.Router();


// create product route
router.post('/product/create', requireSignin, DealerAdminMiddleware, createProduct);
// get products route
router.get('/products', read);

module.exports = router;