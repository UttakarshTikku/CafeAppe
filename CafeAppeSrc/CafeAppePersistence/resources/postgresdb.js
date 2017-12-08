var Pool = require('pg-pool');

var connPool = new Pool({
  host: '127.0.0.1',
  port: 5432,
  database: 'postgres',
  user: 'dev',
  password: 'dev',
  max: 20,
  min: 4
});

module.exports = connPool;
