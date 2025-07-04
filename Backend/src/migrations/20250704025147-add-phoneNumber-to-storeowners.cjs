'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('storeowners', 'phoneNumber', {
      type: Sequelize.BIGINT,
      allowNull: false,
      unique: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('storeowners', 'phoneNumber');
  }
};
