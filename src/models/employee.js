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
        deletedAt: 'deleted_at',
        defaultScope: {
            attributes: { exclude: ['password'] },
        },
        scopes: {
            withPassword: {
                attributes: { },
            }
        }
    });

    Employee.associate = function(models) {
        Employee.belongsTo(models.Company, {foreignKey: 'companies_id', as: 'company'})
        Employee.belongsTo(models.City, {foreignKey: 'cities_id', as: 'city'})
        Employee.belongsTo(models.Role, {foreignKey: 'roles_id', as: 'role'})
    };

    return Employee;
}