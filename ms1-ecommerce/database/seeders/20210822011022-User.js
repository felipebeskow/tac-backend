'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [{
        name: 'Administrador',
        login: 'admin',
        password: process.env.SECRET,
        type: 'Admin',
        createdBy: 'admin',
        createdAt: '2021/01/01 00:00',
        updatedAt: '2021/01/01 00:00'
      }], 
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
