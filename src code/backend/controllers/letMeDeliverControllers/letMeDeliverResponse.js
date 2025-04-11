const usersModel = require('../../models/user/users.model');
const deliveriesModel = require('../../models/delivery-request/delivery.model');
const letMeDeliverModel = require('../../models/let-me-deliver/letMeDeliver.model');
const getDateFromISO = require('../../utils/getDateFromISO');

const iCanDeliver = async (req, res) => {
    const { travelerId, deliverRequestId, departureCity,
        arrivalCity, departureDate, arrivalDate, maxWeight,price, status } = req.body;

    // validations...
    if (!travelerId) throw "Traveler must be provided!";
    if (!deliverRequestId) throw " Delivery Request must be provided!";
    if (!departureCity) throw "Departure city must be provided!";
    if (!arrivalCity) throw "Departure city must be provided!";
    if (!departureDate) throw "Departure date must be provided!";
    if (!arrivalDate) throw "Arrival date must be provided!";

    if (!maxWeight) throw "Max weight that you can carry is important";

    const getTraveler = await usersModel.findOne({
        _id: travelerId,
    });

    if (!getTraveler) throw "Traveler has not been registered!";
    if (getTraveler.userType !== "Traveler" && getTraveler.userType!=="Other") throw "You can not be allowed to do this. User should be traveler"

    const getDeliveryRequest = await deliveriesModel.findOne({
        _id: deliverRequestId
    })
      
    if (!getDeliveryRequest) throw "Delivery Request has not been registered";
    if( departureDate > arrivalDate ) throw "Pick up date must be after or the same date with arrivale date, please check again";
    if (getDeliveryRequest.status !== "Pending") throw "Delivery request has closed, try others please";
    if (getDeliveryRequest.pickupCity !== departureCity) throw "Your departure city is different from delivery request pick up city, please review again."
    if (getDeliveryRequest.deliveryCity !== arrivalCity) throw "Your arrival city is different from delivery request delivery city, please review again."
    let pickupdateString=getDeliveryRequest.pickupDate.toISOString();
    let deliveryDateString=getDeliveryRequest.desiredDeliveryDate.toISOString();
    if (getDateFromISO(pickupdateString) !== getDateFromISO(departureDate)) throw "Your departure date is different from delivery request pick up date, please review again."
    if (getDateFromISO(deliveryDateString) !== getDateFromISO(arrivalDate)) throw "Your arrival date is different from delivery request desired delivery date, please review again."
    
    const createdLetMeDeliver = await letMeDeliverModel.create({
        travelerId,
        deliverRequestId,
        departureCity,
        departureDate,
        arrivalCity,
        arrivalDate,
        maxWeight,
        price,
        status
    });

    res.status(201).json({
        status: "Your let Me deliver application sent successfully!",
        data: createdLetMeDeliver
    });
};
module.exports = iCanDeliver;
