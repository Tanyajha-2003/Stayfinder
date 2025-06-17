// server/models/listing.js
module.exports = (sequelize, DataTypes) => {
  const Listing = sequelize.define('listing', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },   
     full_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    available_from: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    available_to: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    tableName: 'Listings',
    timestamps: true,
  });

  // Define association
  Listing.associate = (models) => {
    Listing.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };

  return Listing;
};
