module.exports = (sequelize, DataTypes) => {
    const Country = sequelize.define('Country', {
        name: DataTypes.STRING,
        ptName: {
            type: DataTypes.STRING,
            field: 'pt_name'
        },
        initial: DataTypes.STRING,
        bacen: DataTypes.STRING,
    });
    return Country;
}