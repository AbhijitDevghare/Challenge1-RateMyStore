'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('storeowners', 'averageRating', {
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: 0
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('storeowners', 'averageRating');
  }
};
