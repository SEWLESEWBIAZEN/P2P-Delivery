const mongoose = require("mongoose");
const letMeDeliverSchema = new mongoose.Schema(
    {       
        travelerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'users',
            required: [true, "Traveler is required!"],
        },
        deliverRequestId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'deliveries',
            required: [true, "Deliver request is required!"],
            unique:true
        },
        departureCity: {
            type: String,
            required: [true, "Departure city is required"],          
            default:"Addis Ababa"
        },

        arrivalCity: {
            type: String,
            required: [true, "Arrival city is required!"],
        },
       departureDate: {
            type: Date,
            required: [true, "Departure date is Required"]
        },
       arrivalDate: {
            type: Date,
            required: [true, "Arrival date is Required"]
        },
        maxWeight: {
            type: Number,
            required:[true, "Maximum weght is required"],
            default: 0,
        }, 
        price:{
            type:Number,
            required:false
        },    
        status: {
            type:String,
            required: false,
            enum:["Invited","Applied", "Offered","Accepted","handed Over"],
            default: "Applied"
        }       
    },
    {
        timestamps: true,
    }
);

// letMeDeliverSchema.index(
//     { travelerId: 1, deliverRequestId: 1, departureDate: 1 }, 
//     { unique: true }
// );



const letMeDeliversModel = mongoose.model("letmedelivers", letMeDeliverSchema);
module.exports = letMeDeliversModel;
