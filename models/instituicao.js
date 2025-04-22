const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // vamos criar esse arquivo já já

const Instituicao = sequelize.define('Instituicao', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'instituicoes', // nome da tabela no banco
  timestamps: false, // se não tiver colunas createdAt e updatedAt
});

module.exports = Instituicao;