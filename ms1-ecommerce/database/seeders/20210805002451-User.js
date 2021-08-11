'use strict';

require('dotenv-safe').config();
const {User} = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

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
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
