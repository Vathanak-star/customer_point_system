'use strict';

const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('.');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {

    }

    User.init({
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'User'
    });

    return User;
}