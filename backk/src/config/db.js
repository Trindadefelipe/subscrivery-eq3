const mysql = require('mysql2');
require('dotenv').config(); // Adiciona suporte a arquivo .env localmente

const db = mysql.createConnection({
  host: process.env.DB_HOST,       // Lê o Host das variáveis
  user: process.env.DB_USER,       // Lê o Usuário
  password: process.env.DB_PASS,   // Lê a Senha
  database: process.env.DB_NAME,   // Lê o Nome do Banco
  port: process.env.DB_PORT || 4000, // Porta 4000 para TiDB
  ssl: {
    rejectUnauthorized: true       // <--- AQUI ESTÁ O CÓDIGO SSL QUE O TIDB EXIGE
  }
});

db.connect((err) => {
  if (err) {
    console.error('Erro de conexão com o Banco de Dados:', err);
    return;
  }
  console.log('Conexão com o Banco de Dados estabelecida com sucesso!');
});

module.exports = db;
