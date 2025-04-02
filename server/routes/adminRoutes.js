const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const adminControllers = require('../controller/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const slotGenerator = require('../utils/slotGenerator');

router.post('/register',[
    body('name').isLength({min:5}).withMessage("Name must be atleast 5 characters long"),
    body('email').isEmail().withMessage("Email must be a valid email"),
    body('password').isLength({min:5}).withMessage("Password must be atleast 5 characters long")
],adminControllers.addAdmin);

router.post('/login',[
    body('email').isEmail().withMessage("Email must be a valid email"),
    body('password').isLength({min:5}).withMessage("Password must be atleast 5 characters long")
],adminControllers.loginAdmin);
router.post('/add-author', [
    body('name')
        .isLength({ min: 5 })
        .withMessage("Name must be at least 5 characters long"),
    body('email')
        .isEmail()
        .withMessage("Email must be a valid email"),
    body('password')
        .isLength({ min: 5 })
        .withMessage("Password must be at least 5 characters long"),
    body('venueId')
        .isMongoId()
        .withMessage("Venue ID must be a valid MongoDB ObjectId"),
    body('permissions')
        .isIn(['all', 'read', 'write'])
        .withMessage("Permissions must be one of ['all', 'read', 'write']")
], authMiddleware.authAdmin, adminControllers.addAuthor);
router.get('/logout',authMiddleware.authAdmin,adminControllers.logoutAdmin);
// router.get('/add-auto-slots',slotGenerator.autoGenerateSlots);

module.exports = router;