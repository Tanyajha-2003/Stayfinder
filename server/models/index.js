const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  logging: false, 
});

const UserModel = require('./user');
const ListingModel = require('./listing'); 

// Initialize models
const User = UserModel(sequelize, DataTypes);
const Listing = ListingModel(sequelize, DataTypes);

// Add sequelize and Sequelize objects to db object for easy access
const db = {
  sequelize,
  Sequelize,
  User,
  Listing,
};

// Initialize associations if they exist
User.associate && User.associate(db);
Listing.associate && Listing.associate(db);

// Export the db object to make all models available throughout the application
module.exports = db;

