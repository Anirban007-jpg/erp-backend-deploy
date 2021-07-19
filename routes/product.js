const express = require('express');


const { requireSignin, AuthMiddleware, DealerMiddleware, DealerAdminMiddleware,AdminMiddleware } = require('../controllers/auth');

// const {} = require('../controllers/category');
const { createProduct, read, photo, updateProduct, readProduct } = require('../controllers/product');

const router = express.Router();


// create product route
router.post('/product/create', requireSignin, DealerAdminMiddleware, createProduct);
// get products route
router.get('/products', read);
router.get('/product/:productId', readProduct);
router.get("/product/:productId/:imageName", photo);
router.put('/product/:productId', updateProduct);

module.exports = router;