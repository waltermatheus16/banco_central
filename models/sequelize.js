const express = require('express');
const router = express.Router();
const Instituicao = require('../models/Instituicao'); // Importar o modelo

// Rota para listar todas as instituições
router.get('/', async (req, res) => {
  try {
    const instituicoes = await Instituicao.findAll(); // Busca todas as instituições
    return res.status(200).json(instituicoes); // Retorna a lista das instituições
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao listar as instituições', error: error.message });
  }
});

// Rota para criar uma nova instituição
router.post('/', async (req, res) => {
  const { nome, tipo } = req.body;

  try {
    // Cria uma nova instituição no banco de dados
    const instituicao = await Instituicao.create({ nome, tipo });

    // Retorna a instituição criada
    return res.status(201).json(instituicao);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar a instituição', error: error.message });
  }
});

module.exports = router;
