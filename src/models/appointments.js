module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define('Appointment', {
        date: DataTypes.DATE,
    },{
        timestamps: true,
        underscored: true,
        paranoid: true,
        deletedAt: 'deleted_at'
    });

    Appointment.associate = function(models) {
        Appointment.belongsTo(models.Employee, {foreignKey: 'employees_id', as: 'employee'})
        Appointment.belongsTo(models.Patient, {foreignKey: 'patients_id', as: 'patient'})
    };

    return Appointment;
}