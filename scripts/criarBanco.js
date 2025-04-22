const mysql = require('mysql2/promise');

async function criarBanco() {
  const conexao = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Estela2010.'
  });

  try {
    await conexao.query(`CREATE DATABASE IF NOT EXISTS mini_banco_central2`);
    console.log("✅ Banco de dados criado (ou já existia)");

    await conexao.changeUser({ database: 'mini_banco_central2' });

    await conexao.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    await conexao.query(`
      CREATE TABLE IF NOT EXISTS instituicoes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    await conexao.query(`
      CREATE TABLE IF NOT EXISTS contas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        saldo DECIMAL(10,2) NOT NULL,
        usuarioId INT,
        instituicaoId INT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (usuarioId) REFERENCES usuarios(id),
        FOREIGN KEY (instituicaoId) REFERENCES instituicoes(id)
      );
    `);

    await conexao.query(`
      CREATE TABLE IF NOT EXISTS transacoes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        tipo ENUM('credito', 'debito') NOT NULL,
        valor DECIMAL(10,2) NOT NULL,
        contaId INT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        descricao VARCHAR(255),
        FOREIGN KEY (contaId) REFERENCES contas(id)
      );
    `);

    console.log("✅ Tabelas criadas com sucesso!");

    // Inserção de dados
    await conexao.query(`
      INSERT IGNORE INTO usuarios (id, nome, createdAt, updatedAt) VALUES
      (1, 'João Silva', '2025-04-10 13:18:01', '2025-04-10 13:18:01'),
      (2, 'Maria Oliveira', '2025-04-10 13:18:01', '2025-04-10 13:18:01'),
      (3, 'Carlos Pereira', '2025-04-10 18:17:18', '2025-04-10 18:17:18'),
      (4, 'Ana Beatriz', '2025-04-10 18:17:18', '2025-04-10 18:17:18'),
      (5, 'Fernanda Lima', '2025-04-10 18:17:18', '2025-04-10 18:17:18');
    `);

    await conexao.query(`
      INSERT IGNORE INTO instituicoes (id, nome, createdAt, updatedAt) VALUES
      (1, 'Itaú', '2025-04-10 13:18:01', '2025-04-10 13:18:01'),
      (2, 'Banco do Brasil', '2025-04-10 13:18:01', '2025-04-10 13:18:01'),
      (3, 'Caixa Econômica Federal', '2025-04-10 18:16:44', '2025-04-10 18:16:44'),
      (4, 'Bradesco', '2025-04-10 18:16:44', '2025-04-10 18:16:44'),
      (5, 'Santander', '2025-04-10 18:16:44', '2025-04-10 18:16:44');
    `);

    await conexao.query(`
      INSERT IGNORE INTO contas (id, saldo, usuarioId, instituicaoId, createdAt, updatedAt) VALUES
      (1, 2300.00, 1, 1, '2025-04-10 13:18:01', '2025-04-10 18:32:07'),
      (2, 1500.00, 2, 2, '2025-04-10 13:18:01', '2025-04-10 13:18:01'),
      (3, 0.00, 1, 1, '2025-04-10 18:11:47', '2025-04-10 18:11:47'),
      (5, 1000.00, 2, 3, '2025-04-10 18:17:22', '2025-04-10 18:17:22');
    `);

    await conexao.query(`
      INSERT IGNORE INTO transacoes (id, tipo, valor, contaId, createdAt, updatedAt, descricao) VALUES
      (1, 'debito', 200.00, 1, '2025-04-10 13:18:01', '2025-04-10 13:18:01', NULL),
      (2, 'credito', 500.00, 2, '2025-04-10 13:18:01', '2025-04-10 13:18:01', NULL),
      (3, 'credito', 200.00, 1, '2025-04-10 18:29:07', '2025-04-10 18:29:07', 'Salário'),
      (4, 'credito', 300.00, 1, '2025-04-10 18:32:07', '2025-04-10 18:32:07', 'Pix recebido');
    `);

    console.log("✅ Dados inseridos com sucesso!");

  } catch (erro) {
    console.error("❌ Erro ao criar banco ou inserir dados:", erro);
  } finally {
    await conexao.end();
  }
}

criarBanco();
