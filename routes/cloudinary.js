const express = require('express');


const { requireSignin, AuthMiddleware, DealerMiddleware, DealerAdminMiddleware,AdminMiddleware } = require('../controllers/auth');
const { uploadImages, removeImage } = require('../controllers/cloudinary');



const router = express.Router();

// 

router.post('/uploadImages', DealerAdminMiddleware, uploadImages);
router.post('/removeImage', DealerAdminMiddleware, removeImage);

module.exports = router;