module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define('Company', {
        tradeName: {
            type: DataTypes.STRING,
            field: 'trade_name'
        },
        cnpj: DataTypes.STRING,
        phone: DataTypes.STRING,
        email: DataTypes.STRING,
        address: DataTypes.STRING,
        cityId: {
            type: DataTypes.INTEGER,
            field: 'city_id'
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at'
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at'
        },
        deletedAt: {
            type: DataTypes.DATE,
            field: 'deleted_at'
        }
    },{
        timestamps: true,
        underscored: true,
        paranoid: true,
        deletedAt: 'deleted_at'
    });

    Company.associate = function(models) {
        Company.belongsTo(models.City, {foreignKey: 'cities_id', as: 'city'})
    };

    return Company;
}