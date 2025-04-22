const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const Usuario = sequelize.define('Usuario', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Usuario;
