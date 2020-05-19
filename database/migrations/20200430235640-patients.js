'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    
      return queryInterface.createTable('Patients', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        first_name: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        last_name: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        phone: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        email: {
          allowNull: false,
          type: DataTypes.STRING,
          unique: true
        },
        address: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        cpf: {
          allowNull: false,
          type: DataTypes.STRING,
          unique: true
        },
        companies_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Companies',
            key: 'id'
          }
        },
        cities_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Cities',
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

      return queryInterface.dropTable('Patients');
  }
};
