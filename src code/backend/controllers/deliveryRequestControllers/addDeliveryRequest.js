const usersModel = require('../../models/user/users.model');
const deliveriesModel = require('../../models/delivery-request/delivery.model');

const addDeliveryRequest = async (req, res) => {
    const { senderId, pickupCity,pickupDate, deliveryCity, desiredDeliveryDate, itemDescription, weightKg ,budget,negotiable, status } = req.body;

    // validations...
    if (!senderId) throw "Sender must be provided!";
    if (!pickupCity) throw " Pickup city must be provided!";
    if (!deliveryCity) throw "Delivery city must be provided!";

    if (!desiredDeliveryDate) throw "Delivery date is required";
    if (!pickupDate) throw "Pick up date is required";
    if (!itemDescription) throw "Item description is important";
    if (!weightKg) throw "Item weight is important";
    if(pickupDate > desiredDeliveryDate) throw "Delivery date should be after or the same date with pick up date."

    const getSender = await usersModel.findOne({
        _id: senderId,
    });

    if (!getSender) throw "Sender has not been registered!";
    if (getSender.userType !== "Sender") throw "You can not be allowed to do this. User should be sender"

    const createdDelivery = await deliveriesModel.create({
        senderId,
        pickupCity,
        pickupDate,
        deliveryCity,
        desiredDeliveryDate,
        itemDescription,
        weightKg,
        budget,
        negotiable,
        status
    });

    res.status(201).json({
        status: "Your delivery request posted successfully!",
        data: createdDelivery
    });
};
module.exports = addDeliveryRequest;
