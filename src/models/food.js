'use strict';

const Food = (sequelize, DataTypes) => sequelize.define('Food', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    favorite: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    mainIngredient: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

module.exports = Food;