const express = require('express');
const db = require('./config/database'); // Pool com promise

// Importação das rotas
const instituicaoRoutes = require('./routes/instituicaoRoutes');
const contaRoutes = require('./routes/contaRoutes');
const transacaoRoutes = require('./routes/transacaoRoutes');
const saldoRoutes = require('./routes/saldoRoutes');
const extratoRoutes = require('./routes/extratoRoutes');

const app = express();
const port = 3000;

// Middleware para aceitar JSON
app.use(express.json());

// Testa a conexão com o banco de dados
db.getConnection()
  .then(() => {
    console.log('✅ Conexão com o banco de dados bem-sucedida!');
  })
  .catch((err) => {
    console.error('❌ Erro ao conectar com o banco de dados:', err);
  });

// Rota raiz
app.get('/', (req, res) => {
  res.send('🚀 API rodando com sucesso!');
});

// Definição das rotas
app.use('/instituicoes', instituicaoRoutes); // CRUD de instituições financeiras
app.use('/contas', contaRoutes);             // CRUD de contas de usuário
app.use('/transacoes', transacaoRoutes);     // Lançamentos de crédito/débito
app.use('/saldo', saldoRoutes);              // Consultas de saldo
app.use('/extrato', extratoRoutes);          // Extrato completo e por instituição

// Inicializa o servidor
app.listen(port, () => {
  console.log(`🌐 Servidor rodando em http://localhost:${port}`);
});
