const cloudinary = require('cloudinary');

// config options
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

exports.uploadImages = (req,res) => {
    let result = cloudinary.uploader.upload(req.body.image, {
        public_id: `${Date.now()}`,
        resource_type: 'auto'
    });

    res.status(200).json({
        public_id: result.public_id,
        url: result.secure_url
    })
}

exports.removeImage = (req,res) => {
    let imageid = req.body.public_id;

    cloudinary.uploader.destroy(image_id, (err,res) => {
        if (err){
            return res.status(400).json({
                success: false,
                err
            })
        }
        res.status(200).send("ok");
    })
}