const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');
const Conta = require('./Conta');

const Transacao = sequelize.define('Transacao', {
  tipo: {
    type: DataTypes.ENUM('credito', 'debito'),
    allowNull: false,
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  data: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

Transacao.belongsTo(Conta);

module.exports = Transacao;
