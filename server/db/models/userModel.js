const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { verify } = require('crypto');
const { type } = require('os');

const userSchema = new mongoose.Schema({
    name:{
        firstname:{
            type: String,
            required: true
        },
        lastname:{
            type: String,
        
        }
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    photo:{
        type: String
    },
    emailVerified:{
        type: Boolean,
        required: true,
        default: false  
    },
    password:{
        type: String,
        
        select: false
    },
    phNo:{
        type: Number,
        
    }
    
});

userSchema.methods.generateAuthToken = async function(){
    const token =  jwt.sign({_id: this._id}, process.env.JWT_SECRET, { expiresIn: '36h' });
    return token;
};

userSchema.methods.comparePassword =  async function(inputPassword){

    return await bcrypt.compare(inputPassword, this.password);
};

userSchema.statics.hashPassword = async function(password){
    
    return await bcrypt.hash(password, 10);
};
const User = mongoose.model('User', userSchema);
module.exports = User;