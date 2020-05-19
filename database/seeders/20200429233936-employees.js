'use strict';
const bcrypt = require ('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('employees', [{
        id: 1,
        first_name: 'Doctor',
        last_name: 'Digimed',
        phone: '14981122328',
        email: 'doctor@digimed.com',
        password: bcrypt.hashSync('digimed', 10),
        address: 'Maria Glória de Campos, 93',
        cpf: '47545237841',
        companies_id: 1,
        cities_id: 5034,
        roles_id: 1
      },
      {
        id: 2,
        first_name: 'Nurse',
        last_name: 'Digimed',
        phone: '14981122328',
        email: 'nurse@digimed.com',
        password: bcrypt.hashSync('digimed', 10),
        address: 'Maria Glória de Campos, 93',
        cpf: '47545237842',
        companies_id: 1,
        cities_id: 5034,
        roles_id: 2
      },
      {
        id: 3,
        first_name: 'Recepcionist',
        last_name: 'Digimed',
        phone: '14981122328',
        email: 'recepcionist@digimed.com',
        password: bcrypt.hashSync('digimed', 10),
        address: 'Maria Glória de Campos, 93',
        cpf: '47545237843',
        companies_id: 1,
        cities_id: 5034,
        roles_id: 3
      }], {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('employees', null, {});
  }
};
