const mongoose = require("mongoose");
const deliveryContractSchema = new mongoose.Schema(
    {
        letMeDeliverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'letmedelivers',
            required: [true, "Traveler is required!"]            
        },
        deliverRequestId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'deliveries',
            required: [true, "Deliver request is required!"],           
        },
     
        trackingCode: {
            type: String,
            required: [true, "Tracking Code is important"],
            unique: true
        },
        priceAgrredOn: {
            type: Number,
            required: [true, "Price you both parties agreed on is required!"]
        },
        status: {
            type: String,
            required: false,
            enum: ["Agreed", "handed Over", "Delivered","Done"],
            default: "Agreed"
        }
    },
    {
        timestamps: true,
    }
);

deliveryContractSchema.index(
    { letMeDeliverId: 1, deliverRequestId: 1}, 
    { unique: true }
);



const deliveryContractsModel = mongoose.model("deliveryContracts", deliveryContractSchema);
module.exports = deliveryContractsModel;
