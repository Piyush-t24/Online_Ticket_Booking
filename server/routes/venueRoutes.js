const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const venueControllers = require('../controller/venueControllers');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');

// Memory storage for Multer (files will be stored in memory)


const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', "Only images are allowed"));
        }
    },
    limits: { fileSize: 30 * 1024 * 1024 }, // 30MB
});

  
router.post('/add-entries', upload.single('image'), [
    body('name').isLength({ min: 5 }).withMessage("Name must be at least 5 characters long"),
    body('address').isLength({ min: 5 }).withMessage("Address must be at least 5 characters long"),
    body('city').isLength({ min: 3 }).withMessage("City must be at least 3 characters long"),
    body('state').isLength({ min: 3 }).withMessage("State must be at least 3 characters long"),
    body('pin').isLength({ min: 6 }).withMessage("Pin must be at least 6 characters long"),
    body('line').isLength({ min: 5 }).withMessage("Description must be at least 5 characters long"),
    body('elaborated').isLength({ min: 5 }).withMessage("Description must be at least 5 characters long"),
    body('indianAdult').isNumeric().withMessage("Indian Adult fare must be a number"),
    body('indianChild').isNumeric().withMessage("Indian Child fare must be a number"),
    body('foreignAdult').isNumeric().withMessage("Foreign Adult fare must be a number"),
    body('foreignChild').isNumeric().withMessage("Foreign Child fare must be a number"),
    body('openingHour').isNumeric().withMessage("Opening hour must be a number"),
    body('openingMinute').isNumeric().withMessage("Opening minute must be a number"),
    body('closingHour').isNumeric().withMessage("Closing hour must be a number"),
    body('closingMinute').isNumeric().withMessage("Closing minute must be a number"),
    body('workingDays').isArray().withMessage("Working days must be an array"),
    body('workingDays.*').isIn(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']).withMessage("Working days must be a valid day of the week"),
    body('typeofVenue').isIn(['Museum', 'Monuments', 'Urban_Attraction']).withMessage("Type must be a valid type"),
    body('phNo').isMobilePhone().withMessage("Phone number must be a valid phone number"),

], authMiddleware.authAdmin, venueControllers.addVenue);


router.get('/get-entries',venueControllers.getAllVenue);
router.get('/museum/:id',venueControllers.getVenue);
router.get('/slot/:id/:date',venueControllers.getSlotsByDate);
module.exports = router;