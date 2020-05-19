module.exports = (sequelize, DataTypes) => {
    const City = sequelize.define('City', {
        name: DataTypes.STRING,
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

    City.associate = function(models) {
        City.belongsTo(models.State, {foreignKey: 'states_id', as: 'state'})
    };

    return City;
}