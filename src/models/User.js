const db = require('./../libs/connect');

const User = db.sequelize.define('users', {
    name: {
        type: db.Sequelize.STRING
    },
    login: {
        type: db.Sequelize.STRING
    },
    password: {
        type: db.Sequelize.STRING
    }
})

module.exports = User