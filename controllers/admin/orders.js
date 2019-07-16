// const Order = require('../../models/order');
// const OrderItem = require('../../models/order_item');
// const Product = require('../../models/product');
// const Sequelize = require('sequelize');

// async function getOrderProducts(order_id) {
//     var result = [];
//     await OrderItem.findAll({ where: { order_id } }).then(orderItems => {
//         var promises = orderItems.map(function (item) {
//             // console.log(item.product_id);
//             return Product.findByPk(item.product_id);
//         });
//         Promise.all(promises).then(function (products) {
//             return products
//         });
//     })

// }
// exports.getOrders = (req, res, next) => {
//     // const order = getOrder(req.query.order);
//     // const limit = Number(req.query.limit) || 5;
//     // const page = req.query.page || 1;
//     // const offset = limit * (page - 1);
//     var response = [];
//     Order.findAll().then(orders => {
//         orders.forEach(order => {
//             getOrderProducts(order.id).then(arr => {
//                 response.push({
//                     id: order.id,
//                     products: arr
//                 })
//                 console.log(response);
//             })

//         })
//         res.status(200).send(response);
//     })

// };