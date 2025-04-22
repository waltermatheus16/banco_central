const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Conta = sequelize.define('Conta', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  saldo: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  instituicaoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'contas',
  timestamps: true,
});

module.exports = Conta;
