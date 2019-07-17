const Order = require('../../models/order');
const OrderItem = require('../../models/order_item');
const Sequelize = require('sequelize');

exports.completeOrder = (req, res, next) => {
    const product_ids = req.body.product_ids;
    const user_id = req.user_id;
    let order_id;
    Order.create({ user_id }).then(order => {
        order_id = order.id;
        product_ids.forEach(product_id => {
            OrderItem.create({
                order_id, product_id
            })
        })
        OrderItem.findAll().then(() => {
            res.status(200).send({ msg: "Order is completed" });
        })
    })
}