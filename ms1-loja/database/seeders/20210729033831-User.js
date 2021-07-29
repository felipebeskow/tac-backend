'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'User',
      [
        {
          name: 'Felipe Beskow',
          email: 'felipebeskow@outlook.com',
          login: 'beskow',
          password: '123',
          type: 'Administrator',
          createdBy: 'beskow',
          createdAt: new Date().toLocaleString(),
          updatedAt: new Date().toLocaleString()
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('User', null, {});
  }
};
