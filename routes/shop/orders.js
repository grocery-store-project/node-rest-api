const express = require('express');

const shopOrderController = require('../../controllers/shop/orders');

const router = express.Router();
const isAuth = require('../../middleware/is-auth');

router.post('/complete-order', isAuth, shopOrderController.completeOrder);

module.exports = router;