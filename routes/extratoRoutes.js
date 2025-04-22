const express = require('express');
const router = express.Router();
const db = require('../config/database');

// GET /extrato/usuario/:id - Extrato completo do usuário
router.get('/usuario/:id', async (req, res) => {
  const usuarioId = req.params.id;

  try {
    const [[usuario]] = await db.query('SELECT nome FROM usuarios WHERE id = ?', [usuarioId]);
    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    const [extrato] = await db.query(`
      SELECT t.id, t.tipo, t.valor, t.descricao, t.createdAt,
             i.nome AS instituicao, c.id AS contaId
      FROM transacoes t
      JOIN contas c ON t.contaId = c.id
      JOIN instituicoes i ON c.instituicaoId = i.id
      WHERE c.usuarioId = ?
      ORDER BY t.createdAt DESC
    `, [usuarioId]);

    res.json({
      mensagem: `Extrato completo de ${usuario.nome}`,
      usuarioId,
      nomeUsuario: usuario.nome,
      extrato
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao obter extrato do usuário.' });
  }
});

// GET /extrato/usuario/:usuarioId/instituicao/:instituicaoId - Extrato por instituição
router.get('/usuario/:usuarioId/instituicao/:instituicaoId', async (req, res) => {
  const { usuarioId, instituicaoId } = req.params;

  try {
    const [[usuario]] = await db.query('SELECT nome FROM usuarios WHERE id = ?', [usuarioId]);
    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    const [[instituicao]] = await db.query('SELECT nome FROM instituicoes WHERE id = ?', [instituicaoId]);
    if (!instituicao) {
      return res.status(404).json({ erro: 'Instituição não encontrada' });
    }

    const [extrato] = await db.query(`
      SELECT t.id, t.tipo, t.valor, t.descricao, t.createdAt,
             i.nome AS instituicao, c.id AS contaId
      FROM transacoes t
      JOIN contas c ON t.contaId = c.id
      JOIN instituicoes i ON c.instituicaoId = i.id
      WHERE c.usuarioId = ? AND c.instituicaoId = ?
      ORDER BY t.createdAt DESC
    `, [usuarioId, instituicaoId]);

    res.json({
      mensagem: `Extrato de ${usuario.nome} no banco ${instituicao.nome}`,
      usuarioId,
      nomeUsuario: usuario.nome,
      instituicao: instituicao.nome,
      extrato
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao obter extrato filtrado por instituição.' });
  }
});

module.exports = router;
