'use strict';

// Connect to db 
const DATABASE_URL = process.env.NODE_ENV === 'test' 
? 'sqlite:memory'
: process.env.NODE_ENV === 'production' 
? process.env.HEROKU_POSTGRESQL_YELLOW_URL 
: process.env.DATABASE_URL === 'development'; 

// Configuration is ENV dependent - Test, Dev or Prod
const { Sequelize, DataTypes } = require('sequelize');

const sequelizeOptions = process.env.NODE_ENV === 'production' 
? {
  dialectOptions: {
    ssl: {
      required: true,
      rejectUnauthorized: false,
    }
  }
}
: {};

let sequelize = new Sequelize(DATABASE_URL, sequelizeOptions);

// Define our schemas/modeles
const clothesSchema = require('./clothes.js');
const foodSchema = require('./food.js');

module.exports = {
    db: sequelize,
    Clothes: clothesSchema(sequelize, DataTypes),
    Food: foodSchema(sequelize, DataTypes),
};