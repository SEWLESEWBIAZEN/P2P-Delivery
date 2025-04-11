const deliveryContractModel = require('../../models/delivery-contract/deliveryContracts.model');

const getAllDeliveryContracts = async (req, res) => {
    try {
        const deliveryContracts = await deliveryContractModel.find();
        
        if (!deliveryContracts || deliveryContracts.length === 0) {
            return res.status(404).json({
                status: "Not Found!",
                message: "No delivery contracts found"               
            });
        }

        return res.status(200).json({
            status: "Success",
            count: deliveryContracts.length,
            data: deliveryContracts
        });

    } catch (error) {
        return res.status(500).json({
            status: "Error",
            message: error.message
        });
    }
};

const getDeliveryContractById = async (req, res) => {   
    try {       
        const deliveryContract = await deliveryContractModel.findOne({_id:req.params.id});
        
        if (!deliveryContract) {
            return res.status(404).json({
                status: "Not Found!",
                message: "Delivery contract is not found with the given ID"               
            });
        }

        return res.status(200).json({
            status: "Success",
            data: deliveryContract
        });

    } catch (error) {
        return res.status(500).json({
            status: "Error",
            message: error.message
        });
    }
};

module.exports = {
    getAllDeliveryContracts,
    getDeliveryContractById
};