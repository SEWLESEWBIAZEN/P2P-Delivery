const express = require('express');
const userRoutes = require('./users/users.routes');
const requestDeliveryRoutes = require('./deliveryRequest/requestDeliveries.routes');
const letMeDeliverRoutes = require('./let-me-deliver/letMeDeliver.routes');
const deliveryContractRoutes = require('./deliveryContract/deliveryContracts.routes');

const router = express.Router();

// API routes
router.use('/users', userRoutes);
router.use('/delivery-request',requestDeliveryRoutes);
router.use('/let-me-deliver', letMeDeliverRoutes);
router.use('/deliver-contract',deliveryContractRoutes);

module.exports = router;