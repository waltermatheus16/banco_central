const express = require('express');
const router = express.Router();
const db = require('../config/database');

// GET /saldo/usuario/:id - Saldo total do usuário
router.get('/usuario/:id', async (req, res) => {
  const usuarioId = req.params.id;

  try {
    const [result] = await db.query(`
      SELECT u.nome AS nomeUsuario, u.id AS usuarioId, 
             SUM(c.saldo) AS saldoTotal
      FROM usuarios u
      JOIN contas c ON u.id = c.usuarioId
      WHERE u.id = ?
      GROUP BY u.id, u.nome
    `, [usuarioId]);

    if (result.length === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado ou sem contas.' });
    }

    const usuario = result[0];

    res.json({
      mensagem: `O saldo total de ${usuario.nomeUsuario} é R$ ${Number(usuario.saldoTotal).toFixed(2)}`,
      usuarioId: usuario.usuarioId,
      nome: usuario.nomeUsuario,
      saldoTotal: Number(usuario.saldoTotal).toFixed(2)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao obter saldo total do usuário.' });
  }
});

// GET /saldo/usuario/:usuarioId/instituicao/:instituicaoId - Saldo por instituição
router.get('/usuario/:usuarioId/instituicao/:instituicaoId', async (req, res) => {
  const { usuarioId, instituicaoId } = req.params;

  try {
    const [[usuario]] = await db.query('SELECT nome FROM usuarios WHERE id = ?', [usuarioId]);
    const [[instituicao]] = await db.query('SELECT nome FROM instituicoes WHERE id = ?', [instituicaoId]);

    if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });
    if (!instituicao) return res.status(404).json({ erro: 'Instituição não encontrada' });

    const [[resultado]] = await db.query(`
      SELECT SUM(saldo) AS saldo
      FROM contas
      WHERE usuarioId = ? AND instituicaoId = ?
    `, [usuarioId, instituicaoId]);

    const saldo = resultado.saldo || 0;

    res.json({
      mensagem: `O saldo de ${usuario.nome} no banco ${instituicao.nome} é R$ ${Number(saldo).toFixed(2)}`,
      usuarioId: Number(usuarioId),
      nomeUsuario: usuario.nome,
      instituicao: instituicao.nome,
      saldo: Number(saldo).toFixed(2)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao obter saldo por instituição.' });
  }
});

module.exports = router;
