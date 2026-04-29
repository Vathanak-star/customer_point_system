'use strict';

const {Model} = require('sequelize');

module.exports = (sequelize,DataTypes) => {
    class Customer extends Model {

    }

    Customer.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        point: {
            type: DataTypes.DECIMAL,
            allowNull: false
        }
    },{
        sequelize,
        modelName: 'Customer'
    });

    return Customer;
}