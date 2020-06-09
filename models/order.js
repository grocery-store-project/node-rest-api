'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    user_id: DataTypes.INTEGER
  }, {});
  Order.associate = function (models) {
    Order.belongsToMany(models.Product, { as: 'products', through: 'orderitems', foreignKey: 'order_id', otherKey: 'product_id' })
    Order.belongsTo(models.User, { as: 'users', through: 'orderitems', foreignKey: 'user_id', otherKey: 'product_id' })
  };
  return Order;
};