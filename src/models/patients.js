module.exports = (sequelize, DataTypes) => {
    const Patient = sequelize.define('Patient', {
        firstName: {
            type: DataTypes.STRING,
            field: 'first_name'
        },
        lastName: {
            type: DataTypes.STRING,
            field: 'last_name'
        },
        phone: DataTypes.STRING,
        email: DataTypes.STRING,
        address: DataTypes.STRING,
        cpf: DataTypes.STRING
    },{
        timestamps: true,
        underscored: true,
        paranoid: true,
        deletedAt: 'deleted_at'
    });

    Patient.associate = function(models) {
        Patient.belongsTo(models.Company, {foreignKey: 'companies_id', as: 'company'})
        Patient.belongsTo(models.City, {foreignKey: 'cities_id', as: 'city'})
    };

    return Patient;
}