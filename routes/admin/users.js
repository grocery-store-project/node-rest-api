const express = require('express');
const router = express.Router();
const { check } = require('express-validator/check');


const adminUsersController = require('../../controllers/admin/users');
const validationMessages = {
    empty: 'This field cannot be empty',
    number: 'This value must be a number',
    email: 'Please enter correct email',
}
const userValidation = [
    check('email').trim()
        .not().isEmpty().withMessage(validationMessages.empty)
        .isEmail().withMessage(validationMessages.email),
    check('first_name').trim()
        .not().isEmpty().withMessage(validationMessages.empty),
    check('last_name').trim()
        .not().isEmpty().withMessage(validationMessages.empty),
    check('role_id').trim()
        .not().isEmpty().withMessage(validationMessages.empty).
        isNumeric().withMessage(validationMessages.number)
]

router.post('/delete-user/:userId', adminUsersController.deleteUser);
router.post('/add-user', userValidation, adminUsersController.addUser);
router.post('/edit-user/:userId', userValidation, adminUsersController.editUser);
router.get('/get-users', adminUsersController.getUsers);

module.exports = router;
