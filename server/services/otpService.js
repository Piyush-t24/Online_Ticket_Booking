const otpModel = require('../db/models/otpModel');
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
        user: process.env.HH_EMAIL,
        pass: process.env.HH_PASSWORD
    }
});

module.exports.sendOTP = async (email) => {
    if (!email) {
        throw new Error("Email is required");
    }

    const otp = otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        specialChars: false,
        upperCaseAlphabets: false
    });

    const hashedOtp = await bcrypt.hash(otp, 10);
    const cDate = new Date();

    try {
        // Save OTP to DB
        const savedOtp = await otpModel.findOneAndUpdate(
            { email },
            { otp: hashedOtp, expiresAt: new Date(cDate.getTime() + 10 * 60 * 1000) }, // 10 min expiry
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        const mailOptions = {
            from: process.env.HH_EMAIL,
            to: email,
            subject: "OTP FROM MUSEOPASS",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px; background-color: #f9f9f9;">
                    <h2 style="text-align: center; color: #333;">GREETINGS, </h2>
                    <p style="font-size: 16px;">Dear User,</p>
                    <p style="font-size: 16px;">Your one-time password (OTP) for verification is:</p>
                    <h1 style="text-align: center; color: #007BFF;">${otp}</h1>
                    <p style="font-size: 16px;">This OTP is valid for <strong>10 minutes</strong>. Please do not share it with anyone.</p>
                    <hr>
                    <p style="text-align: center; font-size: 14px; color: #777;">If you did not request this OTP, please ignore this email.</p>
                </div>`
        };

        // Send email and wait for completion
        await transporter.sendMail(mailOptions);

        return { status: true, message: "OTP sent successfully" };
    } catch (error) {
        throw { status: false, message: error.message };
    }
};
module.exports.verifyOTP = async (email, otp) => {
    if (!email || !otp) {
        return { status: false, message: "Email and OTP are required" };
    }

    try {
        // Find OTP record in the database
        const otpRecord = await otpModel.findOne({ email });

        if (!otpRecord) {
            return { status: false, message: "OTP invalid. dne" };
        }

        // Compare the provided OTP with the hashed OTP
        const isMatch = await bcrypt.compare(otp, otpRecord.otp);
        
        if (!isMatch) {
            return { status: false, message: "Invalid OTP" };
        }

        // Delete OTP from the database after verification
        await otpModel.deleteOne({ email });

        return { status: true, message: "OTP verified successfully" };
    } catch (error) {
        return { status: false, message: error.message };
    }
};