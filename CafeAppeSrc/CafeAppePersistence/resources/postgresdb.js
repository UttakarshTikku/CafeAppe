const pg = require('pg');
var constants = require('../resources/constants');

const connectionString = process.env.DATABASE_URL || constants.SQL.DATASOURCE;

var dbConnection = new pg.Client({
  host: '127.0.0.1',
  port: 5432,
  database: 'postgres',
  user: 'dev',
  password: 'dev'
});
dbConnection.connect();

module.exports = dbConnection;
