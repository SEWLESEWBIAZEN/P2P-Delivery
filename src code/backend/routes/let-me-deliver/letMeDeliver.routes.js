const express =require('express');
const iCanDeliver = require('../../controllers/letMeDeliverControllers/letMeDeliverResponse');
const { getAllLetMeDeliverResponses, getLetMeDeliverResponseById } = require('../../controllers/letMeDeliverControllers/getLetMeDeliverResponses');

const letMeDeliverRoutes= express.Router()


letMeDeliverRoutes.post("/add",iCanDeliver);
letMeDeliverRoutes.get("/getAll",getAllLetMeDeliverResponses);
letMeDeliverRoutes.get("/getById/:id",getLetMeDeliverResponseById);

module.exports=letMeDeliverRoutes;