const pg = require('pg');
var constants = require('../resources/constants');

const connectionString = process.env.DATABASE_URL || constants.SQL.DATASOURCE;

var dbConnection = new pg.Client(connectionString);
dbConnection.connect();

module.exports = dbConnection;
