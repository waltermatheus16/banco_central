


npm install
------------------------------------------------------

BAIXE O Mysql no seu computador 

Arrume com seus dados na config/database.js

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'seu_usuario',
  password: 'sua_senha',
  database: 'mini_banco_central',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool; 


Arrume com seus dados na config/config.js

module.exports = {
  username: 'root',
  password: 'Estela2010.',  // Substitua pela senha correta
  database: 'mini_banco_central2', // Nome do seu banco de dados
  host: 'localhost',
  dialect: 'mysql',
};


Arrume com seus dados no scripts/criarbanco.js

async function criarBanco() {
  const conexao = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Estela2010.'
  });


---------------------------------------------------------
rodar banco de dados: node scripts/criarBanco.js

E DEPOIS

rodar servidor: node server.js

ESTA PRONTO PARA OS TESTES
---------------------------------------------------------

📘 O que significam débito e crédito no contexto da MINHA API de banco?


🔻 Débito
Significa uma saída de dinheiro da conta.

Exemplo: Pagamento de contas, compras, saques.

Diminui o saldo da conta.

{
  "tipo": "debito",
  "valor": 200.00,
  "descricao": "Compra no mercado"
}

🔺 Crédito
Significa uma entrada de dinheiro na conta.

Exemplo: Salário, transferências recebidas, depósitos.

Aumenta o saldo da conta.

{
  "tipo": "credito",
  "valor": 1000.00,
  "descricao": "Salário"
}





EXEMPLOS PARA FAZER AS FUNCIONALIDADES OBRIGATORIAS NO POSTMAN

✅ 1. Cadastrar Instituições Financeiras


POST http://localhost:3000/instituicoes



{
  "nome": "Nubank"
}

✅ 2. Cadastrar Contas para Usuários
POST http://localhost:3000/contas

{
  "usuarioId": 1,
  "instituicaoId": 2,
  "saldo": 1500.00
}


✅ 3. Realizar Lançamentos (Transações)
POST http://localhost:3000/transacoes

{
  "tipo": "credito",
  "valor": 500.00,
  "descricao": "Salário",
  "contaId": 1
}

OU

{
  "tipo": "debito",
  "valor": 200.00,
  "descricao": "Conta de Luz",
  "contaId": 2
}


✅ 4. Obter Saldo Total do Usuário
GET http://localhost:3000/saldo/usuario/1


✅ 5. Obter Saldo por Instituição
GET http://localhost:3000/saldo/usuario/1/instituicao/2


✅ 6. Obter Extrato Completo do Usuário
GET http://localhost:3000/extrato/usuario/1
