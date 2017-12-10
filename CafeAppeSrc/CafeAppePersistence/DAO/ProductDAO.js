var connPool = require('../resources/postgresdb');
var constants = require('../resources/constants');



module.exports.createProduct = function (cafeId, pName, activeFlag, createdBy , createdDateTime, modifiedDateTime, modifiedBy) {
    connPool.query(
        constants.SQL.CREATE_PRODUCT, [cafeId, 0, pName, activeFlag, createdBy, createdDateTime, modifiedDateTime, modifiedBy], function(err, res ) {
            if(err) throw err;
            else console.log(res);
        });
};

module.exports.createProductPromise = function (cafeId, pName, activeFlag, createdBy , createdDateTime, modifiedDateTime, modifiedBy){

    console.log(constants.SQL.CREATE_PRODUCT);
    return new Promise(function (resolve, reject) {
        connPool.query(
            constants.SQL.CREATE_PRODUCT, [cafeId, pName, activeFlag, createdBy, createdDateTime, modifiedDateTime, modifiedBy], function(err, res ) {
                if(err) {
                    reject(err);
                }
                else resolve(res);
            });
    })};


module.exports.createProductSizePromise = function (productId, productsizeid, price, tax, activeFlag, createdBy
    , createdDateTime, modifiedDateTime, modifiedBy){
    return new Promise(function (resolve, reject) {
        connPool.query(
            constants.SQL.CREATE_PRODUCT_SIZE, [price, tax, activeFlag, createdBy
                , createdDateTime, modifiedDateTime, modifiedBy], function(err, res ) {
                if(err) {
                    reject(err);
                }
                else resolve(res);
            });
    })};




module.exports.viewProduct = function() {
    return new Promise( function (resolve, reject) {
        connPool.query(
            constants.SQL.VIEW_PRODUCT, function (err, res) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    //console.log(res);
                    resolve(res);
                }
            });
    });

}



module.exports.viewProductById = function(id){
    connPool.query(
        constants.SQL.VIEW_PRODUCT_BY_ID, [id], function(err, res) {
            if(err) throw err;
            else console.log(res);
        });
};

module.exports.getProduct = function(id) {
    return new Promise( function (resolve, reject) {
        dbConnection.query(
            constants.SQL.GET_PRODUCT, [id],function (err, res) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    //console.log(res);
                    resolve(res);
                }
            });
    });

}

module.exports.updateProductPromise = function (cafeId, pName,modifiedDateTime, modifiedBy){

    console.log(constants.SQL.UPDATE_PRODUCT);
    console.log(cafeId + pName + modifiedDateTime + modifiedBy);
    return new Promise(function (resolve, reject) {
        connPool.query(
            constants.SQL.UPDATE_PRODUCT, [cafeId, pName, modifiedDateTime, modifiedBy], function(err, res ) {
                if(err) {
                    reject(err);
                }
                else resolve(res);
            });
    })};
