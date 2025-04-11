const letMeDeliverModel = require('../../models/let-me-deliver/letMeDeliver.model');

const getAllLetMeDeliverResponses = async (req, res) => {
    try {
        const letMeDeliverResponses = await letMeDeliverModel.find();
        
        if (!letMeDeliverResponses || letMeDeliverResponses.length === 0) {
            return res.status(404).json({
                status: "Not Found!",
                message: "No let me deliver responses found"               
            });
        }

        return res.status(200).json({
            status: "Success",
            count: letMeDeliverResponses.length,
            data: letMeDeliverResponses
        });

    } catch (error) {
        return res.status(500).json({
            status: "Error",
            message: error.message
        });
    }
};

const getLetMeDeliverResponseById = async (req, res) => {   
    try {       
        const letMeDeliverResponse = await letMeDeliverModel.findOne({_id:req.params.id});
        
        if (!letMeDeliverResponse) {
            return res.status(404).json({
                status: "Not Found!",
                message: "Let me deliver response not found with the given ID"               
            });
        }

        return res.status(200).json({
            status: "Success",
            data: letMeDeliverResponse
        });

    } catch (error) {
        return res.status(500).json({
            status: "Error",
            message: error.message
        });
    }
};

module.exports = {
    getAllLetMeDeliverResponses,
    getLetMeDeliverResponseById
};