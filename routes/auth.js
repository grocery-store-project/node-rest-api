const express = require('express');
const { body } = require('express-validator/check');
const validationMessages = {
    empty: 'This field cannot be empty',
    email: 'Enter correct email address',
    long5: 'This value must be at least 5 chars long',

}
const signUpValidation = [
    body('email')
        .isEmail().withMessage(validationMessages.email)
        .not().isEmpty().withMessage(validationMessages.empty),
    body('first_name')
        .not().isEmpty().withMessage(validationMessages.empty),
    body('last_name')
        .not().isEmpty().withMessage(validationMessages.empty),
    body('password')
        .not().isEmpty().withMessage(validationMessages.empty)
        .isLength({ min: 5 }).withMessage(validationMessages.long5)
]


const authController = require('../controllers/auth');

const router = express.Router();

router.put('/sign-up', signUpValidation, authController.signUp);
router.put('/sign-in', authController.signIn);

module.exports = router;

