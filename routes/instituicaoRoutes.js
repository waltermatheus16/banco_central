const express = require('express');
const router = express.Router();

// Rota para listar instituições
router.get('/', (req, res) => {
  res.send('Lista de instituições financeiras');
});

// Rota para criar instituição
router.post('/', (req, res) => {
  const { nome } = req.body;
  res.send(`Instituição ${nome} criada com sucesso`);
});

module.exports = router;
