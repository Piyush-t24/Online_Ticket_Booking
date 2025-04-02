const adminModel = require('../db/models/adminModel');

module.exports.addAdmin = async (obj) => {
    if (!obj) {
        return { error: 'Please provide all the details' };
    }try{
        const admin = await adminModel.create(obj);
        
        return admin;
    }catch(err){
        return {error: err.message};
    }
    
}
