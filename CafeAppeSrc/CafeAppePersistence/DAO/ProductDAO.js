var client = require('../DBConnections/postgresdb');




module.exports.createProduct = function (pName, pSize , pPrice) {
    client.query(
        "insert into CafeAppe.state values ($1, $2, $3)", ['WA', 'Western Australia','true'], function(err, res ) {
            if(err) throw err;
            else console.log(res);
        })
}

module.exports.viewProduct = function (){
    client.query(
        "select * from CafeAppe.state", function(err, res ) {
            if(err) throw err;
            else console.log(res);
        });
}
