const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [5, "Name must be atleat 3 character long"]
    },
    typeofVenue:{
        type: String,
        required: true,
        enum: ['Museum','Monuments', 'Urban_Attraction']
    },
    location: {
        address:{
            type: String,
            required: true
        },
        city:{
            type: String,
            required: true
        },
        state:{
            type: String,
            required: true
        },
        pin:{
            type: Number,
            required: true,
            minlength: [6, "Pin must be 6 digit long"]
        }
    },
    description:{
        line:{
            type: String,
            required: true
        },
        elaborated:{
            type: String,
            required: true
        }
    },
    fare:{
        indianAdult:{
            type: Number,
            required: true
        },
        indianChild:{
            type: Number,
            required: true
        },
        foreignAdult:{
            type: Number,
            required: true
        },
        foreignChild:{
            type: Number,
            required: true
        }
    },
    workingHours:{
        opening:{
            hour:{
                type: Number,
                required: true
            },
            minute:{
                type: Number,
                required: true
            }
        },
        closing:{
            hour:{
                type: Number,
                required: true
            },
            minute:{
                type: Number,
                required: true
            }
        }
    },
    workingsDays:{
        type: [String],
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        required: true
    },
    phNo:{
        type: Number,
        required: true,
        minlength: [10, "Phone number must be 10 digit long"]   
    },
    email:{
        type: String
    },
    imgLink:{
        type: String,
        required: true
    }

});
venueSchema.statics.getVenue = async function(id){
    const venue = await Venue.findById(id);
    return venue;
};
const Venue = mongoose.model('Venue', venueSchema);

module.exports = Venue;