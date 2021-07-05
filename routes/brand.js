const express = require('express');


const { requireSignin, AuthMiddleware, DealerMiddleware, DealerAdminMiddleware,AdminMiddleware } = require('../controllers/auth');

const {createBrand, ListBrands, readBrand, updateBrand, deleteBrand} = require('../controllers/brand');

const router = express.Router();


// create brand route
router.post('/brand/create', requireSignin, DealerMiddleware, createBrand);
// list of brand route
router.get('/brands',  ListBrands);
// read a single brand route
router.get('/brand/:slug', readBrand);
// update a brand 
router.put('/brand/:slug', requireSignin, DealerMiddleware, updateBrand);
// delete a brand route
router.delete('/brand/:slug', requireSignin, AdminMiddleware, deleteBrand);

module.exports = router;