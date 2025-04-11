
const deliveriesModel = require('../../models/delivery-request/delivery.model');
const letMeDeliverModel = require('../../models/let-me-deliver/letMeDeliver.model');
const deliveryContract = require('../../models/delivery-contract/deliveryContracts.model');

const addDeliveryContract = async (req, res) => {
    const { letMeDeliverId, deliverRequestId, trackingCode, priceAgrredOn, status } = req.body;

    // validations...
    if (!letMeDeliverId) throw "Delivery application must be provided!";
    if (!deliverRequestId) throw " Delivery Request must be provided!";
    if (!trackingCode) throw "Tracking code is important!";
    if (!priceAgrredOn) throw "Price you agreed upon must be provided!";

    const getLetMeDeliverResponse = await letMeDeliverModel.findOne({
        _id: letMeDeliverId,
    });

    if (! getLetMeDeliverResponse) throw "Let Me deliver application has not been registered. Please check it out again!";   

    const getDeliveryRequest = await deliveriesModel.findOne({
        _id: deliverRequestId
    })
    if (!getDeliveryRequest) throw "Delivery Request has not been registered";    

    const createdDeliveryContract = await deliveryContract.create({
         letMeDeliverId,
         deliverRequestId, 
         trackingCode, 
         priceAgrredOn, 
         status
    });

    res.status(201).json({
        status: "Delivery contract secured successfully!",
        data: createdDeliveryContract
    });
};
module.exports = addDeliveryContract;
