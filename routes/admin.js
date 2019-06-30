const express = require('express');
const { check } = require('express-validator/check');

const adminController = require('../controllers/admin');

const router = express.Router();

const validationMessages = {
    empty: 'This field cannot be empty',
    number: 'This value must be a number',
    long5: 'This value must be at least 5 chars long',
    long10: 'This value must be at least 10 chars long'
}

const productValidation = [
    check('title').trim()
        .isLength({ min: 5 }).withMessage(validationMessages.long5)
        .not().isEmpty().withMessage(validationMessages.empty),
    check('description').trim()
        .isLength({ min: 10 }).withMessage(validationMessages.long10)
        .not().isEmpty().withMessage(validationMessages.empty),
    check('barCode').trim()
        .isLength({ min: 5 }).withMessage(validationMessages.long5)
        .not().isEmpty().withMessage(validationMessages.empty),
    check('categoryId').trim()
        .isNumeric().withMessage(validationMessages.number)
        .not().isEmpty().withMessage(validationMessages.empty),
    check('priceType').trim()
        .isNumeric().withMessage(validationMessages.number)
        .not().isEmpty().withMessage(validationMessages.empty),
    check('vatRate').trim()
        .isNumeric().withMessage(validationMessages.number)
        .not().isEmpty().withMessage(validationMessages.empty),
    check('price').trim()
        .isNumeric().withMessage(validationMessages.number)
        .not().isEmpty().withMessage(validationMessages.empty),

]

router.post('/add-product', productValidation, adminController.addProduct);
router.post('/edit-product/:productId', productValidation, adminController.editProduct);
router.post('/delete-product/:productId', adminController.deleteProduct);

module.exports = router;