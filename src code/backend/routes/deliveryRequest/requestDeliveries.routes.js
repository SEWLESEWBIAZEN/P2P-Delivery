const express = require("express");
const addDeliveryRequest= require('../../controllers/deliveryRequestControllers/addDeliveryRequest');
const { getAllDeliveryRequests, getDeliveryRequestById } = require("../../controllers/deliveryRequestControllers/getDeliveryRequests");
const requestDeliveryRoutes = express.Router();
requestDeliveryRoutes.post('/add', addDeliveryRequest);
requestDeliveryRoutes.get('/getAll', getAllDeliveryRequests);
requestDeliveryRoutes.get('/getById/:id', getDeliveryRequestById);
module.exports = requestDeliveryRoutes;