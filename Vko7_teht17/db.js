const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
}).promise();


pool.getConnection()
    .then(connection => {
        console.log('Yhdistetty tietokantaan!');
        connection.release();
    })
    .catch(error => {
        console.error('Tietokantayhteys epäonnistui:', error.message);
    });

module.exports = pool;
