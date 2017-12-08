const pg = require('../../node-postgres-todo/node_modules/pg');
var constants = require('../resources/constants');


const connectionString = process.env.DATABASE_URL || constants.SQL.DATASOURCE;

var dbConnection = new pg.Client(connectionString);
dbConnection.connect();

module.exports = dbConnection;
