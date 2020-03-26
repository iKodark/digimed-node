const Sequelize = require('sequelize')
const sequelize = new Sequelize('digimed', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = {
    sequelize: sequelize,
    Sequelize: Sequelize
}