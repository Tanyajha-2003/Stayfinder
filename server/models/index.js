const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  logging: false, 
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
});
sequelize.authenticate()
  .then(() => console.log('✅ Connected to DB'))
  .catch((err) => console.error('❌ DB connection error:', err));

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
sequelize.sync()
  .then(() => console.log('✅ All models synchronized'))
  .catch((err) => console.error('❌ Sync error:', err));

// Export the db object to make all models available throughout the application
module.exports = db;

