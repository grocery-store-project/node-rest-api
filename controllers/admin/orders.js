const Order = require('../../models/order');
const Product = require('../../models/product');
const User = require('../../models/user');
const getOrder = (sort) => {
    switch (sort) {
        case '3':
            return [['createdAt', 'ASC']];
        case '4':
            return [['createdAt', 'DESC']];
        default:
            return [['id', 'ASC']];
    }
}

exports.getOrders = (req, res, next) => {
    const order = getOrder(req.query.order);
    const limit = Number(req.query.limit) || 5;
    const page = req.query.page || 1;
    const offset = limit * (page - 1);
    Order.findAndCountAll({
        include: [{
            model: Product,
            as: 'products'
        }, {
            model: User,
            as: 'users'
        }], order, limit, offset
    }).then(result => {
        const orders = result.rows;
        const page_all = Math.ceil(result.count / limit)
        res.send({ orders, page_all });
    })

};