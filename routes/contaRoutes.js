const express = require('express');
const router = express.Router();
const { Sequelize, DataTypes } = require('sequelize');

// Conexão com o banco
const sequelize = new Sequelize('mini_banco_central', 'root', 'Estela2010.', {
  host: 'localhost',
  dialect: 'mysql',
});

// Modelo Conta
const Conta = sequelize.define('Conta', {
  saldo: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.0,
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  instituicaoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'contas',
  timestamps: true,
});

// Garante que a tabela esteja criada (sem forçar recriação)
Conta.sync();

// Rota para criar conta
router.post('/', async (req, res) => {
  try {
    const { usuarioId, instituicaoId, saldo } = req.body;

    if (usuarioId == null || instituicaoId == null || saldo == null) {
      return res.status(400).json({ erro: 'usuarioId, instituicaoId e saldo são obrigatórios.' });
    }

    const novaConta = await Conta.create({
      usuarioId,
      instituicaoId,
      saldo,
    });

    res.status(201).json({
      mensagem: 'Conta criada com sucesso!',
      conta: novaConta
    });

  } catch (error) {
    console.error('Erro ao criar conta:', error);
    res.status(500).json({ erro: 'Erro ao criar conta' });
  }
});

// Listar todas as contas
router.get('/', async (req, res) => {
  try {
    const contas = await Conta.findAll();
    res.json(contas);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar contas' });
  }
});

// Buscar conta por ID
router.get('/:id', async (req, res) => {
  try {
    const conta = await Conta.findByPk(req.params.id);

    if (!conta) {
      return res.status(404).json({ erro: 'Conta não encontrada' });
    }

    res.json(conta);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar conta' });
  }
});

module.exports = router;
