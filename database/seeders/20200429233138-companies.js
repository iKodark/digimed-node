'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('companies', [{
        id: 1,
        trade_name: 'Consultório Digimed',
        cnpj: '31204648000103',
        phone: '14981122328',
        email: 'admin@digimed.com',
        address: 'Av. Sampaio Vidal, 903',
        cities_id: 5034
      }], {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('companies', null, {});
  }
};
