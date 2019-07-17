const Sequelize = require('sequelize');

const sequelize = require('../util/database');
const Order = require('./order')
// const Product = require('./product')

const OrderItem = sequelize.define('order_item', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    product_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    order_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});
OrderItem.belongsTo(Order, { foreignKey: 'order_id' })

module.exports = OrderItem;