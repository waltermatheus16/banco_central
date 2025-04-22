const { Usuario, Conta, Instituicao } = require('../models');

// Cadastrar usuário
exports.criarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json(usuario);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao cadastrar usuário', error: err });
  }
};

// Obter saldo total do usuário
exports.obterSaldoTotal = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id, {
      include: { model: Conta, include: Instituicao }
    });

    const saldoTotal = usuario.contas.reduce((total, conta) => total + parseFloat(conta.saldo), 0);
    res.json({ saldoTotal });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao obter saldo', error: err });
  }
};
