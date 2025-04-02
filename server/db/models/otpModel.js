const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    otp: {
        type: String,
        required: true,
        length: 6
    },
   email: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        default: Date.now,
        expires: 600 // 10 minutes
    }
});

module.exports = mongoose.model('OTP', otpSchema);