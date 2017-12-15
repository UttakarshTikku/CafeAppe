var connPool = require('../resources/postgresdb');
var constants = require('../resources/constants');



module.exports.createProduct = function (cafeId, pName, activeFlag, createdBy , createdDateTime, modifiedDateTime, modifiedBy) {
    connPool.query(
        constants.SQL.CREATE_PRODUCT, [cafeId, 0, pName, activeFlag, createdBy, createdDateTime, modifiedDateTime, modifiedBy], function(err, res ) {
            if(err) throw err;
            else console.log(res);
        });
};

module.exports.createProductPromise = function (cafeId, pName, activeFlag, createdBy , createdDateTime, modifiedDateTime, modifiedBy, pDesc){

    return new Promise(function (resolve, reject) {
        connPool.query(
            constants.SQL.CREATE_PRODUCT, [cafeId, pName, activeFlag, createdBy, createdDateTime, modifiedDateTime, modifiedBy, pDesc], function(err, res ) {
                if(err) {
                    reject(err);
                }
                else resolve(res);
            });
    })};


module.exports.createProductSizePromise = function (productId, productsizeid, price, tax, activeFlag, createdBy
    , createdDateTime, modifiedDateTime, modifiedBy, size){
    return new Promise(function (resolve, reject) {
        connPool.query(
            constants.SQL.CREATE_PRODUCT_SIZE, [price, tax, activeFlag, createdBy
                , createdDateTime, modifiedDateTime, modifiedBy, size], function(err, res ) {
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
        connPool.query(
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

module.exports.updateProductPromise = function (cafeId, pName,modifiedDateTime, modifiedBy, pDesc){

    return new Promise(function (resolve, reject) {
        connPool.query(
            constants.SQL.UPDATE_PRODUCT, [cafeId, pName, modifiedDateTime, modifiedBy, pDesc], function(err, res ) {
                if(err) {
                    reject(err);
                }
                else resolve(res);
            });
    })};

module.exports.updateProductSizePromise = function (productid, productsizeid,price, modifiedDateTime, modifiedBy, size){

    return new Promise(function (resolve, reject) {
        connPool.query(
            constants.SQL.UPDATE_PRODUCT_SIZE, [productid, productsizeid,price, modifiedDateTime, modifiedBy, size], function(err, res ) {
                if(err) {
                    reject(err);
                }
                else resolve(res);
            });
    })};


module.exports.archiveProduct = function (productId){

    //console.log(cafeId + pName + modifiedDateTime + modifiedBy);
    return new Promise(function (resolve, reject) {
        connPool.query(
            constants.SQL.ARCHIVE_PRODUCT, [productId], function(err, res ) {
                if(err) {
                    reject(err);
                }
                else resolve(res);
            });
    })};

module.exports.archiveProductSize = function (productId, productSizeId){

    return new Promise(function (resolve, reject) {
        connPool.query(
            constants.SQL.ARCHIVE_PRODUCT_SIZE, [productId, productSizeId], function(err, res ) {
                if(err) {
                    reject(err);
                }
                else resolve(res);
            });
    })};


module.exports.deleteMenu = function (cafeId){

    //console.log(cafeId + pName + modifiedDateTime + modifiedBy);
    return new Promise(function (resolve, reject) {
        connPool.query(
            constants.SQL.DELETE_MENU, [cafeId], function(err, res ) {
                if(err) {
                    reject(err);
                }
                else resolve(res);
            });
    })};

module.exports.createMenuPromise = function (cafeId, productname,productdrescription, productsize, productprice){

    return new Promise(function (resolve, reject) {
        connPool.query(
            constants.SQL.CREATE_MENU, [cafeId, productname,productdrescription, productsize, productprice], function(err, res ) {
                if(err) {
                    reject(err);
                }
                else resolve(res);
            });
    })};

module.exports.viewMenu = function() {
    return new Promise( function (resolve, reject) {
        connPool.query(
            constants.SQL.VIEW_MENU, function (err, res) {
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