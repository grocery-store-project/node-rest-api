const Sequelize = require('sequelize');

const sequelize = require('../util/database');
const Product = require('./product')

const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});
Order.belongsToMany(Product, { as: 'products', through: 'order_items', foreignKey: 'order_id', otherKey: 'product_id' })
module.exports = Order;