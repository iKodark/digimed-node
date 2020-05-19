'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {

      return queryInterface.createTable('Appointments', { 
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        date: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        patients_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Patients',
            key: 'id'
          }
        },
        employess_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Employees',
            key: 'id'
          }
        },
        created_at: {
          allowNull: false,
          type: DataTypes.DATE,
          defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
          allowNull: false,
          type: DataTypes.DATE,
          defaultValue: DataTypes.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        },
        deleted_at: {
          allowNull: true,
          type: DataTypes.DATE,
        },
       });
  },

  down: (queryInterface) => {
    
      return queryInterface.dropTable('Appointments');
  }
};
