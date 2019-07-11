const express = require('express');
const router = express.Router();

const adminUsersController = require('../../controllers/admin/users');

router.post('/delete-user/:userId', adminUsersController.deleteUser);
router.get('/get-users', adminUsersController.getUsers);

module.exports = router;
