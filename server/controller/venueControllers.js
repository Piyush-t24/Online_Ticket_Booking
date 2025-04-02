const {validationResult} = require('express-validator');
const venueService = require('../services/venueService');
const {s3Uploadv3} = require('../services/s3service');
const slotting = require('../services/slotting');

module.exports.addVenue = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ errors: errors.array() });
    }
    if (!req.file) {
        console.log("Error 1");
        return res.status(400).json({ error: "Image file is required" });
    }

    try {
       
        const imgData = await s3Uploadv3(req.file);

        // If the structure has a 'Location' key, it should be accessed here
        const imgLink = imgData.Location || imgData.result?.Location;

        if (!imgLink) {
            return res.status(500).json({ error: "Failed to retrieve image link from S3" });
        }
        const venue = {
            name: req.body.name,
            typeofVenue: req.body.typeofVenue,
            location: {
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                pin: req.body.pin
            },
            description: {
                line: req.body.line,
                elaborated: req.body.elaborated
            },
            fare: {
                indianAdult: req.body.indianAdult,
                indianChild: req.body.indianChild,
                foreignAdult: req.body.foreignAdult,
                foreignChild: req.body.foreignChild
            },
            workingHours: {
                opening: {
                    hour: req.body.openingHour,
                    minute: req.body.openingMinute
                },
                closing: {
                    hour: req.body.closingHour,
                    minute: req.body.closingMinute
                }
            },
            workingsDays: req.body.workingDays,
            phNo: req.body.phNo,
            email: req.body.email,
            imgLink: imgLink
          
        };

        const result = await venueService.addVenue(venue);
        res.status(201).json({result});
    } catch (error) {
        console.error("Error uploading venue:", error);
        res.status(500).json({ error: "Failed to upload venue" });
    }
};

module.exports.getAllVenue = async (req, res) => {

    const { name } = req.query;

    if (name) {
        try {
            const entries = await venueService.findByKeyword(name);

            if (entries.length === 0) {
                return res.status(404).json({ message: 'No entries found for the given name.' });
            }

            return res.status(200).json(entries);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    } else {
        try {
            const result = await venueService.getAllVenue();
            return res.status(200).json(result);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

};
module.exports.getVenue = async (req,res)=>{
    const venueId = req.params.id;
    try{
        const venue=  await venueService.getVenuebyId(venueId)
        if(!venue){
            throw new Error("Doesnot exist");
            
        }
        
        res.status(201).json({venue})
    }
    catch(e){
        return res.status(401).json({error: e.message})
    }

}
module.exports.getSlotsByDate =async (req,res)=>{
    const {id , date}= req.params;
    console.log(id, date);
    try{
        const slots = await slotting.searchSlotbyVenuedate(id,date);
        res.status(201).json({slots})
    }catch(e){
        res.status(405).json("Slot not found");
    }
}