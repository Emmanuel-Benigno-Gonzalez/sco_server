'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('aeronave', 'tipo_motor', {
      type: Sequelize.STRING(50),
      allowNull: true,
      after: 'largo'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('aeronave', 'tipo_motor');
  }
};
