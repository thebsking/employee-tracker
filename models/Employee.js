const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Employee extends Model {}

Employee.init(
    {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role_id: {
        type: dataTypes.INTEGER,
        references: {
            model: 'role',
            key: 'id'
        }
    },
    manager_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'employee',
            key: id,
        }
    },

}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'employee',
}
);

module.exports = Employee;