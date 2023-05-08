const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('temperament', {
      id: {
        type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
      },
      temperament: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
  };