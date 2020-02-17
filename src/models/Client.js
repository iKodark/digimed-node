const db = require('./../libs/connect');

const Client = db.sequelize.define('clients', {
    name: {
        type: db.Sequelize.STRING
    },
    cpf: {
        type: db.Sequelize.STRING
    },
    date_of_birth: {
        type: db.Sequelize.DATE
    },
    phone: {
        type: db.Sequelize.STRING
    },
    cep: {
        type: db.Sequelize.STRING
    },
    address: {
        type: db.Sequelize.STRING
    },
    state: {
        type: db.Sequelize.STRING
    },
    city: {
        type: db.Sequelize.STRING
    },
    id_user: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
    }
})

module.exports = Client