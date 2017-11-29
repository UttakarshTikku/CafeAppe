var dbConnection = require('../DBConnections/postgresdb');
var constants = require('../resources/constants');



module.exports.createProduct = function (cafeId, pName, activeFlag, createdBy , createdDateTime, modifiedDateTime, modifiedBy) {
    dbConnection.query(
        constants.SQL.CREATE_PRODUCT, [cafeId, 0, pName, activeFlag, createdBy, createdDateTime, modifiedDateTime, modifiedBy], function(err, res ) {
            if(err) throw err;
            else console.log(res);
        });
};




module.exports.viewProduct = function (){
    dbConnection.query(
        constants.SQL.VIEW_PRODUCT, function(err, res ) {
            if(err) throw err;
            else console.log(res);
        });
};


module.exports.viewProductById = function(id){
    dbConnection.query(
        constants.SQL.VIEW_PRODUCT_BY_ID, [id], function(err, res) {
            if(err) throw err;
            else console.log(res);
        });
};
