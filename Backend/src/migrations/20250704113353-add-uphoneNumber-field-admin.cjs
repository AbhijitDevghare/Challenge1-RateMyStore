'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('admins', 'phoneNumber', {
      type: Sequelize.BIGINT,
      allowNull: false,
      unique: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('admins', 'phoneNumber');
  }
};
