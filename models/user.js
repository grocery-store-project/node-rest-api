'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    role_id: DataTypes.INTEGER,
    email: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};