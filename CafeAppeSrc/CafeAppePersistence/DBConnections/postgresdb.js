const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/adtalkguest';

var client = new pg.Client(connectionString);
client.connect();




//client.query(
//    "select id, name from department where id = 1", (err, res ) => {
//    if (err){
//        console.log(err);
//    }
//    console.log(res.rows[0].name);
//    client.end();
//});

module.exports = client;