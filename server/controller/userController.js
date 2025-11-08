const { validationResult, ExpressValidator } = require('express-validator');
const userModel = require('../db/models/userModel');
const blackList = require('../db/models/blacklistToken');
const userService = require('../services/userService');
const otpService = require('../services/otpService');

module.exports.registerUser = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const exist = await userModel.findOne({ email: req.body.email });
    if (exist) {
        return res.status(401).json({ errors: "user with this email exist" })
    }
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: await userModel.hashPassword(req.body.password)
    };
    const result = await userService.registerUser(user);
    res.cookie('token', result.token, {
        httpOnly: true,  // Prevents JavaScript from accessing it
        secure: process.env.NODE_ENV === 'production',   // Set to `true` if using HTTPS
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'lax',
        partitioned: process.env.NODE_ENV === 'production'  // Adjust for cross-site requests
    }).status(201).json({ result });

};
module.exports.loginUser = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        return res.status(400).json({ errors: errors.array() });
    }
    const user = {
        email: req.body.email,
        password: req.body.password
    };
    const result = await userService.loginUser(user);

    if (result.error) {
        return res.status(400).json({ error: result.error });
    }

    console.log(result.token)
    res.cookie('token', result.token, {
        httpOnly: true,  // Prevents JavaScript from accessing it
        secure: process.env.NODE_ENV === 'production',   // Set to `true` if using HTTPS
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'lax',
        partioned: process.env.NODE_ENV === 'production'  // Adjust for cross-site requests
    })
    res.status(201).json({ result });
}
module.exports.logoutUser = async (req, res) => {
    res.clearCookie('token');
    const token = req.cookies.token || (req.header('Authorization') && req.header('Authorization').split(' ')[1]);
    await blackList.create({ token });
    res.status(200).json({message: "Successfully logged out"});
}
module.exports.generateOtp = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // console.log(req.body)
    const { email } = req.body;
    const exist = await userModel.findOne({ email });
    // console.log(exist)
    if (exist) {
        return res.status(401).json({ error: "Account with this email exist. please Login" })
    }   
    

    try {
        const otpGen = await otpService.sendOTP(email);
        if (otpGen.status == false) {
           return  res.status(400).json(otpGen)
        }
        res.status(200).json({ message: "OTP SENT SUCCESSFULLY" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
module.exports.verifyOtp = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, otp, name, password } = req.body;
    try {
        const verify = await otpService.verifyOTP(email, otp);

        const hashedPassword = await userModel.hashPassword(password);
        const { user, token } = await userService.registerUser({ email, name, password: hashedPassword })
        console.log(user);
        // res.json(verify)
        if (verify.status) {
            // update user status to verified...
            await userService.updateUserStatus(email);
            res.cookie('token', token, {
                httpOnly: true,  // Prevents JavaScript from accessing it
                secure: process.env.NODE_ENV === 'production',   // Set to `true` if using HTTPS
                sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'lax',
                partioned: process.env.NODE_ENV === 'production'  // Adjust for cross-site requests
            })
            res.status(201).json(verify);
        }
        else {
            res.status(500).json({ message: verify.message })
        }
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}
module.exports.generateOtpToLogin= async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        return res.status(400).json({ errors: errors.array() });
    }
    const email=  req.body.email;
    const exist = await userModel.findOne({ email });
    console.log(email)
    if (!exist) {
        return res.status(401).json({ error: "Account with this email exist. please Login" })
    }
    try {
        const otpGen = await otpService.sendOTP(email);
        if (otpGen.status == false) {
           return  res.status(400).json(otpGen)
        }
        res.status(200).json({ message: "OTP SENT SUCCESSFULLY" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
module.exports.verifyOtpLogin = async(req,res)=>{
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, otp } = req.body;
    try {
        const user = await userModel.findOne({ email });
        const verify = await otpService.verifyOTP(email, otp);
        const token = await user.generateAuthToken()
        if (verify.status) {
            res.cookie('token', token, {
                    httpOnly: true,  // Prevents JavaScript from accessing it
                    secure: process.env.NODE_ENV === 'production',   // Set to `true` if using HTTPS
                    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'lax',
                    partioned: process.env.NODE_ENV === 'production'  // Adjust for cross-site requests
            })
            res.status(201).json({ user,token });

        }
        else {
            res.status(500).json({ message: verify.message })
        }
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}