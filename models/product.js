'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    barCode: DataTypes.TEXT,
    categoryId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    priceType: DataTypes.INTEGER,
    vatRate: DataTypes.DOUBLE,
    imageUrl: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Product.associate = function (models) {
    // associations can be defined here
  };
  return Product;
};