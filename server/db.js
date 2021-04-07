const Pool = require('pg').Pool;
require('dotenv').config();

console.log(process.env.PGUSER);

const pool = new Pool({
  user: process.env.PGUSER,
  password: 'ehddhks1',
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
});

module.exports = pool;
