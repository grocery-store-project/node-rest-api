const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/get-products', shopController.getProducts);
router.get('/single-product/:productId', shopController.getSingleProduct);
router.get('/get-categories', shopController.getCategories);

module.exports = router;