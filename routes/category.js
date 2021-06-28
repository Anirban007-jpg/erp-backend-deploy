const express = require('express');


const { requireSignin, AuthMiddleware, DealerMiddleware, DealerAdminMiddleware,AdminMiddleware } = require('../controllers/auth');
const {runValidations} = require('../validators/index');
const {categoryCreateValidator} = require('../validators/category');
const {createCat, ListCategories, readCat, updateCat, deleteCat} = require('../controllers/category');

const router = express.Router();


// create category route
router.post('/category/create', requireSignin, DealerMiddleware, runValidations, categoryCreateValidator, createCat);
// list of categories route
router.get('/categories',  requireSignin, DealerAdminMiddleware, ListCategories);
// read a single category route
router.get('/category/:slug', requireSignin, DealerAdminMiddleware, readCat);
// update a category 
router.put('/category/:slug', requireSignin, DealerMiddleware, updateCat);
// delete a category route
router.delete('/category/:slug', requireSignin, AdminMiddleware, deleteCat);

module.exports = router;