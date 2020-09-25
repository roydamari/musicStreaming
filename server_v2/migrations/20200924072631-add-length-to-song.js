'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'songs',
      'length',
      {
        type: Sequelize.INTEGER,
        allowNull: true
      },
    )
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn(
      'songs',
      'length',
    )
  }
};
