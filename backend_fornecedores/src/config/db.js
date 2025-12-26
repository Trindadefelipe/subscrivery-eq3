import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// Verifica se está rodando no Render (nuvem) ou localmente
const isProduction = process.env.NODE_ENV === 'production' || process.env.DB_HOST?.includes('tidbcloud.com');

const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'subscrivery',
    port: process.env.DB_PORT || 3306,
    // Só ativa o SSL se estiver conectando ao banco da nuvem
    ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: false
    }
});

db.getConnection((err, connection) => {
    if (err) {
        console.error('❌ ERRO CRÍTICO NO BANCO DE DADOS:', err.code);
        console.error('🔍 MENSAGEM:', err.message);
    } else {
        console.log(`✅ Banco de Dados Conectado (${isProduction ? 'Nuvem/SSL' : 'Local'})! 🗄️`);
        connection.release();
    }
});

export default db.promise();
