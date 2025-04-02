const slotModel = require('../db/models/slotModel');

module.exports.createSlot = async (obj) => {
    try {
        if (!obj) {
            return { error: 'Please provide all the details' };
        }

        const { venueId, date, slots } = obj;

        // Convert the start and end time to comparable minute values
        const startMinutes = slots.startTime.hour * 60 + slots.startTime.minute;
        const endMinutes = slots.endTime.hour * 60 + slots.endTime.minute;
        
        // Query for overlapping slots
        const existingSlot = await slotModel.findOne({
            venueId: venueId,
            date: new Date(date), // Ensure date format is consistent
            $or: [
                // {
                //     // Case 1: Existing slot starts within the new slot's range
                //     'slots.startTime.hour': { $gte: slots.startTime.hour, $lte: slots.endTime.hour },
                //     $expr: {
                //         $and: [
                //             { $gte: ['$slots.startTime.minute', startMinutes % 60] },
                //             { $lte: ['$slots.startTime.minute', endMinutes % 60] }
                //         ]
                //     }
                // },
                // {
                //     // Case 2: Existing slot ends within the new slot's range
                //     'slots.endTime.hour': { $gte: slots.startTime.hour, $lte: slots.endTime.hour },
                //     $expr: {
                //         $and: [
                //             { $gte: ['$slots.endTime.minute', startMinutes % 60] },
                //             { $lte: ['$slots.endTime.minute', endMinutes % 60] }
                //         ]
                //     }
                // },
                {
                    // Case 3: Existing slot fully overlaps the new slot
                    $and: [
                        { 'slots.startTime.hour': { $lte: slots.startTime.hour } },
                        { 'slots.endTime.hour': { $gte: slots.endTime.hour } }
                    ]
                }
            ]
        });
        
        if (existingSlot) {
            throw new Error('Overlapping slot already exists for the given date and venue.');
        }
        
        // Step 3: Save new slots to the database
        const newSlotData = await slotModel.create(obj);
        

        return { success: true, message: 'Slot created successfully', newSlotData };
    } catch (err) {
        console.error(err);
        return { error: 'An error occurred while creating the slot' };
    }
};

// Here we need to ad function to manage crowd if booking is more than max cap
module.exports.checkAvailabilty = async (slotId) => {
    if (!slotId) {
        throw new Error('No slot ID provided.');
    }
    try {
        const slot = await slotModel.findOne({ _id: slotId });
        if (!slot) {
            throw new Error('Slot not found.');
        }

        const { maxCapacity, currentBookings } = slot;
        if (currentBookings >= maxCapacity) {
            return false;
        }
        return true;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports.getSlotsbyAuthor = async (venueId) =>{
    if(!venueId){
        throw new Error("invalid input");
        
    }try{
        const slotsList = await slotModel.find({venueId: venueId});
        if(!slotsList){
            throw new Error("slot with this venue dne");
            
        }
        return slotsList;
    }catch (error) {
        console.error(error);
        throw error;
    }
    
}
module.exports.searchSlotbyVenuedate = async (id, date)=>{
    if(!id || !date){
        throw new Error("Invalid input");
    }
    try{
        const slotList = await slotModel.find({venueId:id, date: date})
        if(!slotList){
            throw new Error("Does not exist");
        }
       
        return slotList
    }
    catch(e){
        
        throw e;
    }
}