const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    venueId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Venue',
        required: true,

    },
    date: {
        type: Date,
        required: true,
        
    },
    slots: 
        {
            startTime: {
                hour: { type: Number, required: true },
                minute: { type: Number, required: true }
            },
            endTime: {
                hour: { type: Number, required: true },
                minute: { type: Number, required: true }
            }
        }
    
    ,
            maxCapacity: {
                type: Number,
                required: true
            },
            elasticCapacity: {
                type: Number,
                required: true
            },
            currentBookings: {
                type: Number,
                default: 0
            }
});

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;
