const { Pool } = require('pg');
const credentials = require('./credentials.js');

const pool = new Pool({
  user: credentials.user,
  host: credentials.host,
  database: credentials.database,
  password: credentials.password,
  max: 150,
  port: 5432,
});

module.exports = pool;
