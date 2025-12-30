require('dotenv').config(); // Garante que funcione localmente também
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS, // Usando DB_PASS conforme configurado na Vercel
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 4000, // Usa a porta 4000 do TiDB
  ssl: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true
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