require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 4000,
  ssl: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: false // <--- Mudança importante para evitar erro de certificado
  },
  waitForConnections: true,
  connectionLimit: 5, // Reduzimos um pouco para economizar recursos
  queueLimit: 0,
  connectTimeout: 60000 // <--- Aumenta a paciência da conexão para 60 segundos
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Erro de conexão com o Banco de Dados:', err);
  } else {
    console.log('Conexão com o Banco de Dados estabelecida com sucesso!');
    connection.release();
  }
});

module.exports = pool;