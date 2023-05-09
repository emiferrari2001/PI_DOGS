const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  // Defino el modelo
  sequelize.define('temperament', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    temperament: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    timestamps: false
  });
};