const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        initialAutoIncrement: 259, // Valor inicial del autoincremento
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height:{
      type: DataTypes.STRING, //no es un valor numerico, es un rango
      allowNull: false,
    },
    weight:{
      type: DataTypes.STRING, //no es un valor numerico, es un rango
      allowNull: false,
    },
    lifespan:{
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};
