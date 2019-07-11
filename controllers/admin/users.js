const User = require('../../models/user');
const OrderHelper = require('../../util/order');


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
