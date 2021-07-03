const express = require('express');


const { requireSignin, AuthMiddleware, DealerMiddleware, DealerAdminMiddleware,AdminMiddleware } = require('../controllers/auth');

const {createCat, ListCategories, readCat, updateCat, deleteCat} = require('../controllers/category');

const router = express.Router();


// create category route
router.post('/category/create', requireSignin, DealerMiddleware, createCat);
// list of categories route
router.get('/categories',  ListCategories);
// read a single category route
router.get('/category/:slug', readCat);
// update a category 
router.put('/category/:slug', requireSignin, DealerMiddleware, updateCat);
// delete a category route
router.delete('/category/:slug', requireSignin, AdminMiddleware, deleteCat);

module.exports = router;