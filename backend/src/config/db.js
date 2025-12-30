const mysql = require('mysql2');
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'subscrivery', 
    port: process.env.DB_PORT || 4000,
    ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: false
    }
});

export default db.promise();