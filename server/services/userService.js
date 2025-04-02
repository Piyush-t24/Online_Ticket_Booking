const userModel = require('../db/models/userModel');

module.exports.registerUser = async (obj) => {
    if (!obj) {
        return { error: 'Please provide all the details' };
    }
    try {
        const user = await userModel.create(obj);
        const token = await user.generateAuthToken();
        return {user, token};
    } catch (err) {
        return { error: err.message };
    }

}
module.exports.loginUser = async (obj) => {
    if (!obj) {
        return { error: 'Please provide all the details' };
    }
    try {
        const user = await userModel.findOne({ email: obj.email}).select("+password");
        if (!user) {
            return { error: 'Invalid email' };
        }   
        const passwordMatch = await user.comparePassword(obj.password);
        if (!passwordMatch) {
            return { error: 'Invalid password' };
        }
        const token = await user.generateAuthToken();
        return {user, token};
    }
    catch (err) {
   
        throw new Error("server errors");
        
    }
}
// Assuming user model is in this path

module.exports.updateUserStatus = async (email) => {
    if (!email) {
        return { status: false, message: "Email is required" };
    }

    try {
        // Find and update the user
        const updatedUser = await userModel.findOneAndUpdate(
            { email }, // Search condition
            { emailVerified: true }, // Update field
            { new: true } // Return updated document
        );

        if (!updatedUser) {
            return { status: false, message: "User not found" };
        }

        return { status: true, message: "Email verified successfully", user: updatedUser };
    } catch (error) {
        return { status: false, message: error.message };
    }
};
