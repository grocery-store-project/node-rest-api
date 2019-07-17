const Order = require('../../models/order');
const OrderItem = require('../../models/order_item');
const Product = require('../../models/product');
const Sequelize = require('sequelize');


exports.getOrders = (req, res, next) => {
    // const order = getOrder(req.query.order);
    // const limit = Number(req.query.limit) || 5;
    // const page = req.query.page || 1;
    // const offset = limit * (page - 1);
    Order.findAll({
        include: [{
            model: Product,
            as: 'products'
        }]
    }).then(result => {
        res.send(result);
    })

};