const venueModel = require('../db/models/venueModel');

module.exports.addVenue = (obj)=>{
    if(!obj){
        return {error: 'Please provide all the details'};
    }
    const venue = venueModel.create(obj);
    return venue;
};

module.exports.getAllVenue = async ()=>{
    try{
        const venues = await venueModel.find();
        return venues;
    }catch(err){
        return {error: err.message};
    }
}
module.exports.findByKeyword = async (keyword) => {
    if (!keyword) {
        return { error: 'Please provide a keyword' };
    }
    try {
        const regex = new RegExp(keyword, 'i'); // Case-insensitive regex for partial matching
        const venues = await venueModel.find({ name: { $regex: regex } });
        return venues;
    } catch (err) {
        return { error: err.message };
    }
};
 module.exports.getVenuebyId = async (id)=>{
    if(!id){
        return {error: 'Please provide all the details'};
    }
    try{
        const venue = await venueModel.findById(id);
        // console.log("Reached getVenues");
        return venue;
       
    }catch(err){
        return {error: err.message};
    }

} 