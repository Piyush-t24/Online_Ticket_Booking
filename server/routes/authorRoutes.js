const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const authorController = require('../controller/authorController')
const venueService = require('../services/venueService')
//remove later


router.get('/dashboard',authMiddleware.authAuthor, async (req,res)=>{
    console.log(req.user)
    const venue = await venueService.getVenuebyId(req.user.venueId);

    const details ={
        user: req.user,
        venueName: venue.name,
        location: venue.location,
        imgLink: venue.imgLink
    }
    res.status(201).json({details})
})

//.........................
router.post('/login', [
    body('email').isEmail().withMessage("Email must be a valid email"),
        body('password').isLength({min:5}).withMessage("Password must be atleast 5 characters long")
], authorController.loginAuthor);


router.post('/add-slot',[

    // body('date').isDate().withMessage('Date must be a valid date'),

    // body('slots').withMessage('Slots must be an array').custom((slots) => {
    //     return slots.length > 0;
    // }),

    // // Validate 'maxCapacity' (must be a positive integer)
    // body('maxCapacity').isInt({ min: 1 }).withMessage('Max capacity must be a positive integer'),

    // // Validate 'elasticCapacity' (must be a positive integer)
    // body('elasticCapacity').isInt({ min: 1 }).withMessage('Elastic capacity must be a positive integer'),

    


    
],authMiddleware.authAuthor, authorController.addSlot);

router.get('/get-all-slots',authMiddleware.authAuthor,authorController.getSlots);
router.get('/logout',authMiddleware.authAuthor,authorController.logoutAuthor);
module.exports = router;