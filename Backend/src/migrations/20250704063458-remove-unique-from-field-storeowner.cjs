'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('storeowners', 'address', {
      type: Sequelize.STRING,
      allowNull: false, // keep whatever you had
      unique: false,    // 👈 removes the unique constraint
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('storeowners', 'address', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true, // 👈 restore original constraint in case of rollback
    });
  },
};
