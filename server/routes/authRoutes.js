const express = require('express');
const router = express.Router();
const authController = require('../controller/authController')
router.post('/google',authController.googleLogin)

module.exports = router;