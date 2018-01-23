var pg = require('../../node-postgres-todo/node_modules/pg');

var connPool = new pg.Pool({
  host: 'localhost',
  port: 5432,
  database: 'akhileshlamba',
  user: 'akhileshlamba',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

module.exports = connPool;
