const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'dongwankim',
  password: 'ehddhks1',
  host: 'localhost',
  port: 5432,
  database: 'nanasbowl',
});

module.exports = pool;
