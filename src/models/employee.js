module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('Employee', {
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
        cpf: DataTypes.STRING,
        password: DataTypes.STRING,
    },{
        timestamps: true,
        underscored: true,
        paranoid: true,
        deletedAt: 'deleted_at'
    });

    Employee.associate = function(models) {
        Employee.belongsTo(models.Company, {foreignKey: 'company_id', as: 'company'})
        Employee.belongsTo(models.City, {foreignKey: 'city_id', as: 'city'})
    };

    return Employee;
}