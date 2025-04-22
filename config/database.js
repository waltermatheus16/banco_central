const mysql = require('mysql2');

// Configuração da conexão com o banco de dados MySQL
const pool = mysql.createPool({
  host: 'localhost', // Endereço do banco de dados (pode ser 'localhost' ou o IP do servidor)
  user: 'root', // Seu usuário do MySQL
  password: 'Estela2010.', // Sua senha do MySQL
  database: 'mini_banco_central', // Nome do banco de dados
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Criação de uma promessa para facilitar o uso com async/await
const promisePool = pool.promise();

module.exports = promisePool;
