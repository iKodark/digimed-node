module.exports = (sequelize, DataTypes) => {
    const State = sequelize.define('State', {
        name: DataTypes.STRING,
        uf: DataTypes.STRING,
        ibge: DataTypes.STRING,
        name: DataTypes.INTEGER,
        ddd: DataTypes.STRING,
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

    State.associate = function(models) {
        State.belongsTo(models.Country, {foreignKey: 'country_id', as: 'country'})
    };

    return State;
}