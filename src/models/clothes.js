'use strict';

const Clothes = (sequelize, DataTypes) => sequelize.define('Clothes', {
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hangUp: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    mainColor: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    size: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
});

module.exports = Clothes;