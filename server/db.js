const Pool = require('pg').Pool;
require('dotenv').config();

console.log(process.env.PGUSER);

const pool = new Pool({
  user: 'ubuntu',
  password: 'ehddhks1',
  host: 'localhost',
  port: '5432',
  database: 'nanasbowl',
});

module.exports = pool;
