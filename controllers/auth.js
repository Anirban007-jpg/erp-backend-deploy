const User = require('../models/User');
const _ = require('lodash');
// const { OAuth2Client } = require('google-auth-library');
// const nodemailer = require('nodemailer');
// require('dotenv').config()

const bcrypt = require('bcrypt');

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
// exports.googleLogin = (req,res) => {
//     const idToken = req.body.tokenId;
//     client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID }).then(response => {
//         // console.log(response);
//         const { email_verified, name, email, jti } = response.payload;
//         if (email_verified) {
//             User.findOne({ email }).exec((err, user) => {
//                 if (user) {
//                     // console.log(user)
//                     const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
//                     res.cookie('token', token, { expiresIn: '1d' });
//                     const { _id, email, name, role, username, about, youtube, twitter , facebook, address, mobile_no, registered_on } = user;
//                     return res.json({ token, user: {  _id, email, name, role, username, about, youtube, twitter , facebook, address, mobile_no, registered_on  } });
//                 } else {
//                     let username = sid.generate();
//                     let profile = `${process.env.CLIENT_URL}/profile/${username}`;
//                     let password = jti;
//                     user = new User({ name, email, profile, username, password });
//                     user.save((err, data) => {
//                         if (err) {
//                             return res.status(400).json({
//                                 error: errorHandler(err)
//                             });
//                         }
//                         const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
//                         res.cookie('token', token, { expiresIn: '1d' });
//                         const { _id, email, name, role, username } = data;
//                         return res.json({ token, user: { _id, email, name, role, username } });
//                     });
//                 }
//             });
//         } else {
//             return res.status(400).json({
//                 error: 'Google login failed. Try again.'
//             });
//         }
//     });
// }


exports.Register = (req, res) => {
        // Check if the user is already registered
    
    User.findOne({email: req.body.email}).exec((err,data) => {
        if (data){
          return res.status(400).json({
            error: "User already exsists"
          })
        }
        

    // Create all the variables

    const {PanNo,name,email,password,confirmedPassword,address,mobile_no,about,role,Sex} = req.body;
    let profile = `${process.env.CLIENT_URL}/profile/${PanNo}`;

    // check whether password matches confirmed_password and confimrmed password is blank or not
    if (confirmedPassword === null){
        return res.status(403).json({
            error: "Confirm your password"
        })
    }

    if (password !== confirmedPassword){
        return res.status(403).json({
            error: "Password do not match"
        })
    }
    // hash password and transfer it to a global variable
    var password1 = bcrypt.hashSync(password,10);

    let Acknowledgement_No = _.times(15, () => _.random(35).toString(36)).join('').toUpperCase()
    
    // register user
    let user = new User({
        PanNo,
        name,
        email,
        address,
        mobile_no,
        about,
        role,
        profile,
        Sex,
        password:password1,
        Acknowledgement_No
    });
    
    user.save((err, result) => {
        if (err){
            return res.status(400).json({
                error: error
            })
        }
        res.status(200).json({
            message: `You have been registered successfully! Your Acknowlegement No is ${Acknowledgement_No}`
        })
    })
    })
}


exports.Login = (req,res) => {
    // accept email and password from frontend
    const {PanNo, password} = req.body;

    // check if user with this email exist or not exist
    User.findOne({PanNo}).exec((err, data) => {
        // check if data is present or not
        if (err){
            return res.status(400).json({
                error: err
            })
        }
        if (!data){
            return res.status(400).json({
                error: 'Such an user does not exist'
            })
        }

        // if user present
        // checking password given is right or Wrong
        var checked = bcrypt.compareSync(password, data.password);


        // if password is wrong
        if (!checked) {
            return res.status(403).json({
                error: 'Wrong Password entered'
            })
        }

        // if password is right
        // generate json web token
        const token = jwt.sign({_id: data._id}, process.env.JWT_SECRET, {expiresIn: '50m'});

        // generate cookie and send it to Frontend
        res.cookie('token',token,{expiresIn: '2h'});
        const {_id,Acknowledgement_No,role} = data;
        // send all data to Frontend
        return res.status(200).json({
            token,
            user: {_id,Acknowledgement_No,role},
            message: "User Signed in Successfully"
        });
    })
}

// exports.Logout = (req,res) => {
//     res.clearCookie('token');
//     res.status(200).json({
//         message: "Signout Successful"
//     });
// }


// exports.requireSignin = ejwt({
//     secret: process.env.JWT_SECRET,
//     algorithms: ["HS256"],
//     userProperty: "auth"
// });

// exports.forgotpassword = (req,res) => {
//     const {email} = req.body;

//     User.findOne({email}).exec((err,user) => {
//         if (err || !user){
//             return res.status(404).json({
//                 error: 'User Email not found'
//             });
//         }

//         // generate token
//         const token = jwt.sign({_id: user._id}, process.env.RESET_PASSWORD_SECRET, {expiresIn: '10m'});

//         // mail sending procedure
//         let transporter = nodemailer.createTransport({
//             port: 465,
//             service: "gmail",
//             auth: {
//                 user: 'abanerjee763@gmail.com',
//                 pass: '03432582357'
//             },
//             secure: false
//         });

//         // email content
//         var message = {
//             from: 'abanerjee763@gmail.com',
//             to: email,
//             subject: `Password reset Link`,
//             html: `
//                 <p>Please use the following link to reset your password:</p>
//                 <p>${process.env.CLIENT_URL}/password/reset/${token}</p>
//                 <hr />
//                 <p>This email may contain sensetive information</p>
//                 <p>https://amazonia.com</p>   
//             `
//         }

//         // populating the db > user> resetPasswordLink
//         return user.updateOne({resetPasswordLink: token}, (err,success) => {
//             if (err){
//                 return res.staus(400).json({error : err});
//             }else {
//                 // send mail
//                 transporter.sendMail(message, (err, success) => {
//                     if (err){
//                         console.log(err);
//                         res.json(400).status({
//                             error: err
//                         })
//                     }

//                     res.status(200).json({
//                         success : true
//                     });
//                 })
//             }
//         });
//     })
// }

// exports.resetPassword = (req,res) => {
//     const {resetPasswordLink, newPassword} = req.body;

//     // Checking whether token is expired or not
//     if(resetPasswordLink){
//         jwt.verify(resetPasswordLink, process.env.RESET_PASSWORD_SECRET, function(err, decoded) {
//             if(err){
//                 return res.json(401).json({
//                     error: 'Expired Link. Try again'
//                 })
//             }

//             User.findOne({resetPasswordLink}, (err,user) => {
//                 if (err || !user){
//                     return res.status(401).json({
//                         error: 'something went Wrong'
//                     })
//                 }

//                 let password1 = bcrypt.hashSync(req.body.newPassword, 10);

//                 const updatedFields = { 
//                     password: password1,
//                     resetPasswordLink: ''
//                 };

//                 user = _.extend(user, updatedFields);

//                 user.save((err,result) => {
//                     if (err){
//                         return res.staus(400).json({
//                             error : err
//                         });
//                     }

//                     res.status(200).json({ 
//                         message: 'Great! Your Password is updated Successfully..'
//                     })
//                 })

//             })
//         })
//     }
// }

// // From here upto the last comment ei gulo is for authorization
// exports.AuthMiddleware = (req,res,next) => {
//     const authUserId = req.auth._id;
//     User.findById({_id: authUserId}).exec((err,user) => {
//         if (err || !user){
//             return res.status(400).json({
//                 error: "User isn't signed in"
//             })
//         }

//         // request will store the user information in a object called profile
//         req.profile = user;
//         next();
//     })
// }

// exports.DealerMiddleware = (req,res,next) => {
//     const authUserId = req.auth._id;
//     User.findById({_id: authUserId}).exec((err,user) => {
//         if (err || !user){
//             return res.status(400).json({
//                 error: "User isn't signed in"
//             })
//         }

//         if (user.role === 'Admin' || user.role === 'Shopper' || user.role === 'Customer'){
//             return res.status(401).json({
//                 error: "Dealer resource !!! Access Denied"
//             })
//         }

//         req.profile = user;
//         next();
//     })
// }


// exports.ShopperMiddleware = (req,res,next) => {
//     const authUserId = req.auth._id;
//     User.findById({_id: authUserId}).exec((err,user) => {
//         if (err || !user){
//             return res.status(400).json({
//                 error: "User isn't signed in"
//             })
//         }

//         if (user.role === 'Admin' || user.role === 'Dealer' || user.role === 'Customer'){
//             return res.status(401).json({
//                 error: "Shopper resource !!! Access Denied"
//             })
//         }

//         req.profile = user;
//         next();
//     })
// }

// exports.CustomerMiddleware = (req,res,next) => {
//     const authUserId = req.auth._id;
//     User.findById({_id: authUserId}).exec((err,user) => {
//         if (err || !user){
//             return res.status(400).json({
//                 error: "User isn't signed in"
//             })
//         }

//         if (user.role === 'Admin' || user.role === 'Shopper' || user.role === 'Dealer'){
//             return res.status(401).json({
//                 error: "Customer resource !!! Access Denied"
//             })
//         }

//         req.profile = user;
//         next();
//     })
// }

// exports.AdminMiddleware = (req,res,next) => {
//     const authUserId = req.auth._id;
//     User.findById({_id: authUserId}).exec((err,user) => {
//         if (err || !user){
//             return res.status(400).json({
//                 error: "User isn't signed in"
//             })
//         }

//         if (user.role === 'Dealer' || user.role === 'Shopper' || user.role === 'Customer'){
//             return res.status(401).json({
//                 error: "Admin resource !!! Access Denied"
//             })
//         }

//         req.profile = user;
//         next();
//     })
// }

// exports.DealerAdminMiddleware = (req,res,next) => {
//     const authUserId = req.auth._id;
//     User.findById({_id: authUserId}).exec((err,user) => {
//         if (err || !user){
//             return res.status(400).json({
//                 error: "User isn't signed in"
//             })
//         }

//         if (user.role === 'Shopper' || user.role === 'Customer'){
//             return res.status(401).json({
//                 error: "Dealer and Admin resource !!! Access Denied"
//             })
//         }

//         req.profile = user;
//         next();
//     })
// }

// exports.ShopperCustomerMiddleware = (req,res,next) => {
//     const authUserId = req.auth._id;
//     User.findById({_id: authUserId}).exec((err,user) => {
//         if (err || !user){
//             return res.status(400).json({
//                 error: "User isn't signed in"
//             })
//         }

//         if (user.role === 'Admin' || user.role === 'Dealer'){
//             return res.status(401).json({
//                 error: "Shopper Customer resource !!! Access Denied"
//             })
//         }

//         req.profile = user;
//         next();
//     })
// }