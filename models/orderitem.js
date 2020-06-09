'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    product_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER
  }, {});
  OrderItem.associate = function (models) {
    OrderItem.belongsTo(models.Order, { foreignKey: 'order_id' })

  };
  return OrderItem;
};