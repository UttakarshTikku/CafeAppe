var client = require('../DBConnections/postgresdb');
var constants = require('../../CafeAppeClient/resources/mappings');



module.exports.createProduct = function (cafeId, pName, activeFlag, createdBy , createdDateTime, modifiedDateTime, modifiedBy) {
    client.query(
        constants.SQL.CREATE_PRODUCT, [cafeId, 0, pName, activeFlag, createdBy, createdDateTime, modifiedDateTime, modifiedBy], function(err, res ) {
            if(err) throw err;
            else console.log(res);
        });
};




module.exports.viewProduct = function (){
    client.query(
        constants.SQL.VIEW_PRODUCT, function(err, res ) {
            if(err) throw err;
            else console.log(res);
        });
};


module.exports.viewProductById = function(id){
    client.query(
        constants.SQL.VIEW_PRODUCT_BY_ID, [id], function(err, res) {
            if(err) throw err;
            else console.log(res);
        });
};

