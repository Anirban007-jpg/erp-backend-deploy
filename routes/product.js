const express = require('express');


const { requireSignin, AuthMiddleware, DealerMiddleware, DealerAdminMiddleware,AdminMiddleware } = require('../controllers/auth');

// const {} = require('../controllers/category');
const { createProduct, read, photo } = require('../controllers/product');

const router = express.Router();


// create product route
router.post('/product/create', createProduct);
// get products route
router.get('/products', read);
router.get("/product/:productId/:imageName", photo);

module.exports = router;