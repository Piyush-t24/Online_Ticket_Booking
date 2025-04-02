const { name } = require('ejs');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const adminSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: true,
        minlength: [5, "Name must be atleat 3 character long"]
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        select: false
    }

});
adminSchema.methods.generateAuthToken = async function(){
    const token =  jwt.sign({_id: this._id}, process.env.JWT_SECRET, { expiresIn: '3h' });
    return token;
};

adminSchema.methods.comparePassword =  async function(inputPassword){

    return await bcrypt.compare(inputPassword, this.password);
};

adminSchema.statics.hashPassword = async function(password){
    
    return await bcrypt.hash(password, 10);
};
const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;