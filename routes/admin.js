const express = require('express');
const { check } = require('express-validator/check');

const adminController = require('../controllers/admin');

const router = express.Router();

const productValidation = [
    check('title').trim().isLength({ min: 5 }).withMessage('The title must be at least 5 chars long'),
    check('price').trim().isLength({ min: 5 }).withMessage('The title must be at least 5 chars long'),
]

router.post('/add-product', productValidation, adminController.addProduct);
router.post('/edit-product/:productId', productValidation, adminController.editProduct);
router.post('/delete-product/:productId', adminController.deleteProduct);

module.exports = router;