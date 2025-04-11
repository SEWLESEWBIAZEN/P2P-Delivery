const express = require('express');
const addDeliveryContract = require('../../controllers/deliveryContractControllers/addDeliveryContract');
const { getAllDeliveryContracts, getDeliveryContractById } = require('../../controllers/deliveryContractControllers/getDeliveryContracts');

const deliveryContractRoutes= express.Router();

deliveryContractRoutes.post('/add', addDeliveryContract);
deliveryContractRoutes.get('/getAll', getAllDeliveryContracts);
deliveryContractRoutes.get('/getById/:id', getDeliveryContractById);

module.exports = deliveryContractRoutes;