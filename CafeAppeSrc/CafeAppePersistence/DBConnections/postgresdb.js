const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/adtalkguest';

var client = new pg.Client(connectionString);
client.connect();



module.exports = client;
