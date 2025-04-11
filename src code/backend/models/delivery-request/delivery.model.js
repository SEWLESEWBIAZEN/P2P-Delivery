const mongoose = require("mongoose");
const deliverySchema = new mongoose.Schema(
    {       
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'users',
            required: [true, "Sender is required!"],
        },

        pickupCity: {
            type: String,
            required: [true, "Pickup city is required"],            
            default:"Addis Ababa"
        },

        deliveryCity: {
            type: String,
            required: [true, "delivery city is required!"],
        },
        pickupDate:{
            type: Date,
            required: [true, "Pick up date is Required"]

        },
       desiredDeliveryDate: {
            type: Date,
            required: [true, "Delivery date is Required"]
        },
        itemDescription: {
            type: String,
            required:[true, "Item description is required"],
            default: "Injera",
        },
        weightKg: {
            type: Number,
            required: [true, "Amount is Required"],
            default: 0,
        },
        budget: {
            type: Number,
            required: false,
        },
        negotiable:{
            type:Boolean,
            required:[true, "Negotiable is required!"],
            default:true

        },
        status: {
            type:String,
            required: false,
            enum:["Pending", "Accepted","Delivered","Picked Up"],
            default: "Pending"
        }       
    },
    {
        timestamps: true,
    }
);



const deliveriesModel = mongoose.model("deliveries", deliverySchema);
module.exports = deliveriesModel;
