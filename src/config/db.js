require("dotenv").config();

const mysql = require('mysql2/promise');

async function createConnection() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port:process.env.DB_PORT
    
  });

  return connection;
}

module.exports = createConnection;

