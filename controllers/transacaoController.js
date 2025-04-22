const { Transacao, Conta } = require('../models');

// Adicionar transação
exports.adicionarTransacao = async (req, res) => {
  try {
    const { tipo, valor } = req.body;
    const conta = await Conta.findByPk(req.params.id);
    if (!conta) return res.status(404).json({ message: 'Conta não encontrada' });

    const transacao = await Transacao.create({
      tipo,
      valor,
      contaId: conta.id,
    });

    // Atualizar o saldo da conta
    conta.saldo += tipo === 'credito' ? valor : -valor;
    await conta.save();

    res.status(201).json(transacao);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao adicionar transação', error: err });
  }
};
