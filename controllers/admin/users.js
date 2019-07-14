const User = require('../../models/user');
const OrderHelper = require('../../util/order');
const { validationResult } = require('express-validator/check');

exports.addUser = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Validation failed, entered data is incorrect',
            errors: errors.array()
        })
    }
    User.create(req.query).then(user => {
        res.status(201).json({ message: 'User was added successfully' });
    }).catch(err => {
        next(new Error(err));
    });
};

exports.editUser = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Validation failed, entered data is incorrect',
            errors: errors.array()
        })
    }
    User.update(req.body, { where: { id: req.params.userId } }).then(user => {
        res.status(201).json({ message: 'User was edited successfully', user });
    }).catch(err => {
        next(new Error(err));
    });
};

exports.deleteUser = (req, res, next) => {
    User.destroy({ where: { id: req.params.userId } }).then(() => {
        res.status(200).json({ message: 'User was deleted successfully' });
    }).catch(err => {
        next(new Error(err));
    });
}
exports.getUsers = (req, res, next) => {

    const order = OrderHelper.getOrder(req.query.order);
    const limit = Number(req.query.limit) || 5;
    const page = req.query.page || 1;
    const offset = limit * (page - 1);
    const where = {}
    if (req.query.filter) {
        where = {
            first_name: { [Op.substring]: req.query.filter }
        };
    }
    User.findAndCountAll({
        order, limit, offset, where
    }).then(result => {
        let users = result.rows;
        for (var i = 0; i < users.length; i++) {
            users[i].password = undefined;
        }
        const page_all = Math.ceil(result.count / limit)
        res.status(200).json({ users, page_all });
    }).catch(err => {
        next(new Error(err));
    });
};
