const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    image: {
      type: DataTypes.TEXT,
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
    life_span:{
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  });
};