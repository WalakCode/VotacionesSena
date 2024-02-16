require("dotenv").config();
const {createPool} = require('mysql2/promise')

const pool = createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    database:process.env.DB_NAME,
})

module.exports = pool;  