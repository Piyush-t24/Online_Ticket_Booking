const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');
const userModel = require('../db/models/userModel')


const jwt = require('jsonwebtoken');

router.post('/register', [
    body('name.firstname').isLength({ min: 3 }).withMessage("Name must be atleast 3 characters long"),
    body('name.lastname').isLength({ min: 3 }).withMessage("Name must be atleast 3 characters long"),
    body('email').isEmail().withMessage("Email must be a valid email"),
    body('password').isLength({ min: 5 }).withMessage("Password must be atleast 5 characters long")
], userController.registerUser);
router.post('/login', [
    body('email').isEmail().withMessage("Email must be a valid email"),
    body('password').isLength({ min: 5 }).withMessage("Password must be atleast 5 characters long")
], userController.loginUser);
router.get('/', async (req, res) => {
    try{ 
    const token = req.cookies.token || (req.header('Authorization') && req.header('Authorization').split(' ')[1]);
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const userData = await userModel.findOne({ "_id": decode._id })
    res.status(201).json(userData)
    }catch(e){
        res.status(400).json({e})
    }
})
router.post('/generate-otp',userController.generateOtp);
router.post('/verify-otp', userController.verifyOtp);
router.post('/generate-otp-login', userController.generateOtpToLogin);
router.post('/verify-otp-login', userController.verifyOtpLogin);
router.get('/logout',authMiddleware.authUser,userController.logoutUser);

module.exports = router;