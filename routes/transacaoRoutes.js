const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Rota para realizar transações (depósito ou saque)
router.post('/', async (req, res) => {
  try {
    const { contaId, tipo, valor, descricao } = req.body;

    if (!contaId || !tipo || !valor) {
      return res.status(400).json({ erro: 'Preencha contaId, tipo e valor.' });
    }

    // Busca a conta atual
    const [contaRows] = await db.query('SELECT * FROM contas WHERE id = ?', [contaId]);

    if (contaRows.length === 0) {
      return res.status(404).json({ erro: 'Conta não encontrada.' });
    }

    const conta = contaRows[0];
    const saldoAnterior = parseFloat(conta.saldo);
    let novoSaldo = saldoAnterior;

    let tipoTransacaoDB;

    if (tipo === 'deposito') {
      novoSaldo += parseFloat(valor);
      tipoTransacaoDB = 'credito';
    } else if (tipo === 'saque') {
      if (valor > saldoAnterior) {
        return res.status(400).json({ erro: 'Saldo insuficiente.' });
      }
      novoSaldo -= parseFloat(valor);
      tipoTransacaoDB = 'debito';
    } else {
      return res.status(400).json({ erro: 'Tipo de transação inválido. Use "deposito" ou "saque".' });
    }

    // Atualiza o saldo da conta
    await db.query('UPDATE contas SET saldo = ? WHERE id = ?', [novoSaldo, contaId]);

    // Registra a transação
    await db.query(
      'INSERT INTO transacoes (tipo, valor, contaId, descricao) VALUES (?, ?, ?, ?)',
      [tipoTransacaoDB, valor, contaId, descricao || null]
    );

    // Pega o nome da instituição
    const [instituicaoRows] = await db.query(`
      SELECT i.nome FROM instituicoes i
      INNER JOIN contas c ON c.instituicaoId = i.id
      WHERE c.id = ?
    `, [contaId]);

    const nomeBanco = instituicaoRows.length > 0 ? instituicaoRows[0].nome : 'Banco desconhecido';

    res.status(201).json({
      mensagem: `Transação realizada com sucesso no banco ${nomeBanco}!`,
      contaId,
      tipo: tipoTransacaoDB,
      valor: parseFloat(valor),
      saldoAnterior,
      saldoAtual: novoSaldo,
      descricao
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao realizar transação' });
  }
});

module.exports = router;
