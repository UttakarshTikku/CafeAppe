// const pg = require('pg');
var Pool = require('pg-pool');

// var constants = require('../resources/constants');

var connPool = new Pool({
  host: '127.0.0.1',
  port: 5432,
  database: 'postgres',
  user: 'dev',
  password: 'dev',
  max: 20,
  min: 4
});


// const connectionString = process.env.DATABASE_URL || constants.SQL.DATASOURCE;

// var dbConnection = new pg.Client({
//   host: '127.0.0.1',
//   port: 5432,
//   database: 'postgres',
//   user: 'dev',
//   password: 'dev'
// });
// dbConnection.connect();

// module.exports = dbConnection;

module.exports = connPool;
