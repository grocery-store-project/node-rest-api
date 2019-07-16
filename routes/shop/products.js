const express = require('express');

const shopProductController = require('../../controllers/shop/products');

const router = express.Router();


router.get('/get-products', shopProductController.getProducts);
router.get('/single-product/:productId', shopProductController.getSingleProduct);
router.get('/get-categories', shopProductController.getCategories);

module.exports = router;