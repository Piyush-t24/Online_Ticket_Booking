const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authorSchema = new mongoose.Schema({
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
    },
    venueId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Venue',
            required: true
        
    },
    permissions:{
        type: String,
        required: true,
        enum: ['all', 'read', 'write']
    }

})

authorSchema.methods.generateAuthToken = async function(){
    const token =  jwt.sign({_id: this._id}, process.env.JWT_SECRET, { expiresIn: '3h' });
    return token;
};

authorSchema.methods.comparePassword =  async function(inputPassword){

    // return await bcrypt.compare(inputPassword, this.password);
    return true;
};

authorSchema.statics.hashPassword = async function(password){
    
    return await bcrypt.hash(password, 10);
};
const Author = mongoose.model('Author', authorSchema)
module.exports = Author;