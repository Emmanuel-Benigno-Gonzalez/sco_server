'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('usuario', 'email', {
      type: Sequelize.STRING(100),
      allowNull: true,
      unique: true,
      after: 'id_usuario'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('usuario', 'email');
  }
};
