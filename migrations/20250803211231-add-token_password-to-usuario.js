'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('usuario', 'token_password', {
      type: Sequelize.INTEGER(),
      allowNull: false,
      defaultValue: 0,
      after: 'descripcion' // Posicion donde se va a insertar el nuevo campo
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('usuario', 'token_password');
  }
};
