const adminModel = require('../db/models/adminModel');
const jwt = require('jsonwebtoken');
const blackList = require('../db/models/blacklistToken');
const userModel = require('../db/models/userModel');
const authorModel = require('../db/models/authorModel')
// import captainModel = require('../db/models/captain.model';

module.exports.authAdmin = async (req, res, next) => {
    try {
        
        const token = req.cookies.token || (req.header('Authorization') && req.header('Authorization').split(' ')[1]);
        if (!token) {
            return res.status(401).send('<script>alert("Please log in again"); window.location.href="/";</script>');
        }

        // Verify if the token is valid
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the token is blacklisted
        const isBlackListed = await blackList.findOne({ token });
        if (isBlackListed) {
            res.clearCookie('token');
            return res.status(401).send('<script>alert("Please log in again"); window.location.href="/";</script>');
        }

        // Fetch the admin from the database
        const admin = await adminModel.findById(decode._id);
        if (!admin) {
            return res.status(401).send('<script>alert("Please log in again"); window.location.href="/";</script>');
            //.json({ message: 'Unauthorized: Admin not found' });
        }

        // Attach admin and token to the request object
        req.user = admin;
        req.token = token;

        next(); // Continue to the next middleware or route handler
    } catch (error) {
        console.error('AuthAdmin Middleware Error:', error.message);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired. Please login again.' });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token: ' });
        } else {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports.authUser = async (req, res, next) => {

    const token = req.cookies.token || (req.header('Authorization') && req.header('Authorization').split(' ')[1]);
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const isBlackListed = await blackList.findOne({ token: token.token });
    if (isBlackListed) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        // id of the user is stored is decode._id
        //    console.log(decode)
        const user = await userModel.findById(decode._id);
        if (!user) {
            return res.status(401).json({ message: `User not found ${decode._id}` });
        }
        req.user = user;
        req.token = token;    // added to pass token to logout
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({ message: 'Invalid token' });
    }
};
module.exports.authAuthor = async (req, res, next) => {
    try {
        const token = req.cookies.token || (req.header('Authorization') && req.header('Authorization').split(' ')[1]);
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        // Verify if the token is valid
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the token is blacklisted
        const isBlackListed = await blackList.findOne({ token });
        if (isBlackListed) {
            return res.status(401).json({ message: 'Unauthorized: Token is blacklisted' });
        }

        const author = await authorModel.findById(decode._id);
        if (!author) {
            return res.status(401).json({ error: "Unauthorised access. User not found" })
        }
        req.user = author;
        req.token = token;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired. Please login again.' });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token: ' });
        } else {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}
