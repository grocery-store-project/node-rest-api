const express = require('express');
const router = express.Router();


const adminOrderController = require('../../controllers/admin/orders');
router.get('/get-orders', adminOrderController.getOrders);
module.exports = router;
