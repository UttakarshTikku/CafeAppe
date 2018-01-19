// var Pool = require('pg-pool');
//
// var connPool = new Pool({
//   host: '127.0.0.1',
//   port: 5432,
//   database: 'postgres',
//   user: 'dev',
//   password: 'dev',
//   max: 20,
//   min: 4
// });
//
// module.exports = connPool;

const pg = require('pg');

var connPool = new pg.Client({
  host: '127.0.0.1',
  port: 5432,
  database: 'postgres',
  user: 'dev',
  password: 'dev'
});
connPool.connect();

module.exports = connPool;
