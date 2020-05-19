'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('roles', [{
        id: 1,
        name: 'doctor'
      },
      {
        id: 2,
        name: 'nurse'
      },
      {
        id: 3,
        name: 'receptionist'
      }], {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('roles', null, {});
  }
};
