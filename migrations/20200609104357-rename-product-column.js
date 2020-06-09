'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.renameColumn('Products', 'varRate', 'vatRate');

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Products', 'vatRate', 'varRate');

  }
};
