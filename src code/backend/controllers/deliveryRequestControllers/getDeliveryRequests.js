const deliveryRequestModel = require('../../models/delivery-request/delivery.model');

const getAllDeliveryRequests = async (req, res) => {
    try {
        const deliveryRequests = await deliveryRequestModel.find();
        
        if (!deliveryRequests || deliveryRequests.length === 0) {
            return res.status(404).json({
                status: "Not Found!",
                message: "No delivery requests found"               
            });
        }

        return res.status(200).json({
            status: "Success",
            count: deliveryRequests.length,
            data: deliveryRequests
        });

    } catch (error) {
        return res.status(500).json({
            status: "Error",
            message: error.message
        });
    }
};

const getDeliveryRequestById = async (req, res) => {
   
    try {
       
        const deliveryRequest = await deliveryRequestModel.findOne({_id:req.params.id});
        
        if (!deliveryRequest) {
            return res.status(404).json({
                status: "Not Found!",
                message: "Delivery request not found with the given ID"               
            });
        }

        return res.status(200).json({
            status: "Success",
            data: deliveryRequest
        });

    } catch (error) {
        return res.status(500).json({
            status: "Error",
            message: error.message
        });
    }
};

module.exports = {
    getAllDeliveryRequests,
    getDeliveryRequestById
};