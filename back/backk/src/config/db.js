require('dotenv').config();
const mysql = require('mysql2');

// Usamos createPool em vez de createConnection para suportar Serverless (Vercel)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS, // Lembre-se que na Vercel configuramos como DB_PASS
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 4000,
  ssl: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Teste rápido de conexão ao iniciar (opcional, mas bom para debug)
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Erro de conexão com o Banco de Dados:', err);
  } else {
    console.log('Pool de conexões iniciado com sucesso!');
    connection.release(); // Libera a conexão de volta para o pool
  }
});

// O pool permite usar .query diretamente, igual à conexão antiga
module.exports = pool;