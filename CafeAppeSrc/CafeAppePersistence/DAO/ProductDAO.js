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
                else {
                    console.log(res);
                    resolve(res)};
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

module.exports.createMenuPromise = function (cafeId, productid,productsizeid,createdBy, createdDatetime, modifiedBy, modifiedDatetime){

    return new Promise(function (resolve, reject) {
        connPool.query(
            constants.SQL.CREATE_MENU, [cafeId, productid, productsizeid, createdBy, createdDatetime, modifiedBy, modifiedDatetime], function(err, res ) {
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
                    resolve(res);
                }
            });
    });

}


module.exports.getArchiveProducts = function() {
    return new Promise( function (resolve, reject) {
        connPool.query(
            constants.SQL.GET_ARCHIVE_PRODUCTS, function (err, res) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
    });

}


module.exports.restoreProduct = function (productId){

    //console.log(cafeId + pName + modifiedDateTime + modifiedBy);
    return new Promise(function (resolve, reject) {
        connPool.query(
            constants.SQL.RESTORE_PRODUCT, [productId], function(err, res ) {
                if(err) {
                    reject(err);
                }
                else resolve(res);
            });
    })};

module.exports.restoreProductSize = function (productId, productSizeId){

    return new Promise(function (resolve, reject) {
        connPool.query(
            constants.SQL.RESTORE_PRODUCT_SIZE, [productId, productSizeId], function(err, res ) {
                if(err) {
                    reject(err);
                }
                else resolve(res);
            });
    })};


module.exports.createAddOn = function (name, type, quantity, price, createdBy , createdDateTime, modifiedDateTime, modifiedBy){

    return new Promise(function (resolve, reject) {
        connPool.query(
            constants.SQL.CREATE_ADDON, [name, type, quantity, price, createdBy , createdDateTime, modifiedBy, modifiedDateTime], function(err, res ) {
                if(err) {
                    reject(err);
                }
                else resolve(res);
            });
    })};


module.exports.getAddons = function() {
    return new Promise( function (resolve, reject) {
        connPool.query(
            constants.SQL.GET_ADDONS, function (err, res) {
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

};


module.exports.archiveAddOn = function (addOnId){

    //console.log(cafeId + pName + modifiedDateTime + modifiedBy);
    return new Promise(function (resolve, reject) {
        connPool.query(
            constants.SQL.ARCHIVE_ADD_ON, [addOnId], function(err, res ) {
                if(err) {
                    reject(err);
                }
                else resolve(res);
            });
    })};

module.exports.updateAddOns = function (addOnId, name,type, quantity, price){

    return new Promise(function (resolve, reject) {
        connPool.query(
            constants.SQL.UPDATE_ADD_ONS, [addOnId, name, type, quantity, price], function(err, res ) {
                if(err) {
                    reject(err);
                }
                else resolve(res);
            });
    })
};

module.exports.getArchivedAddOns = function() {
    return new Promise( function (resolve, reject) {
        connPool.query(
            constants.SQL.GET_ARCHIVED_ADD_ONS, function (err, res) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
    });
};

module.exports.restoreAddOn = function (addOnId) {

    //console.log(cafeId + pName + modifiedDateTime + modifiedBy);
    return new Promise(function (resolve, reject) {
        connPool.query(
            constants.SQL.RESTORE_ADD_ON, [addOnId], function (err, res) {
                if (err) {
                    reject(err);
                }
                else resolve(res);
            });
    })
};


module.exports.createAddOn1 = function (name, type, quantity, price, createdBy , createdDateTime, modifiedDateTime, modifiedBy) {
    connPool.connect((err, client, done) => {

        const shouldAbort = (err) => {
            if (err) {
                console.error('Error in transaction', err.stack)
                client.query('ROLLBACK', (err) => {
                    if (err) {
                        console.error('Error rolling back client', err.stack)
                    }
                    // release the client back to the pool
                    done()
                })
            }
            return !!err
        }

        client.query('BEGIN', (err) => {
            if (shouldAbort(err)) return
            client.query(constants.SQL.CREATE_ADDON, [name, type, quantity, price, createdBy , createdDateTime, modifiedBy, modifiedDateTime],
                (err, res) => {
                if (shouldAbort(err)) return
                    client.query('COMMIT', (err) => {
                        if (err) {
                            console.error('Error committing transaction', err.stack)
                        }
                        done()
                    })
                })
            })
        })
};


module.exports.createProduct1 = function (cafeId, pName, activeFlag, createdBy , createdDateTime, modifiedDateTime, modifiedBy, pDesc, priceSize, tax) {

    (async () => {

        const client = await connPool.connect();

        try {
            console.log('Before Begin');
            await client.query('BEGIN');
            console.log('Before First Query');
            var res = await client.query(constants.SQL.CREATE_PRODUCT, [cafeId, pName, activeFlag, createdBy, createdDateTime, modifiedDateTime, modifiedBy, pDesc]);
            console.log(res);
            console.log('After First Query');
            for (var k in priceSize) {
                var res2 = await client.query(constants.SQL.CREATE_PRODUCT_SIZE, [priceSize[k].price, tax, activeFlag, createdBy
                    , createdDateTime, modifiedDateTime, modifiedBy, priceSize[k].size]);
                console.log(res2);
            }
            console.log('After Second Query');
            await client.query('COMMIT');
        } catch (e) {
            await client.query('ROLLBACK');
            throw e
        } finally {
            client.release();
        }
    })().catch(e => console.error(e.stack));

};

module.exports.createProduct2 = function (cafeId, pName, activeFlag, createdBy , createdDateTime, modifiedDateTime, modifiedBy, pDesc, priceSize, tax) {

    var client1 = undefined;
    var result = '';

    const shouldAbort = function (err) {
        if (err) {
            console.error('Error in transaction', err.stack)
            client.query('ROLLBACK', (err) => {
                if (err) {
                    console.error('Error rolling back client', err.stack)
                }
                // release the client back to the pool
                done()
            })
        }
        return !!err
    };

        var promise = new Promise(function (resolve, reject) {
            connPool.connect((err, client, done) => {
                client1 = client;
                //console.log(client1);
                if (err) reject(err);
                else resolve(client);
            })
        }).then(function (result) {
            console.log('Before Begin');
            new Promise (function (resolve, reject) {
                client1.query('BEGIN', function (err) {
                    console.log('In Begin');
                    if (shouldAbort(err)) reject(err);
                });
            })
        }).then(function () {
            console.log('In before first query');
                new Promise (function (resolve, reject) {
                    client1.query(constants.SQL.CREATE_PRODUCT, [cafeId, pName, activeFlag, createdBy, createdDateTime, modifiedDateTime, modifiedBy, pDesc],
                        (err, res) => {
                            console.log('In First Query');
                            if (shouldAbort(err)) {
                                reject(err);
                                console.log(err);
                            }
                            else
                                return resolve(res);
                        })
                })
            }).then(function (result) {
                console.log('In First Then');
                //console.log(result);
                for (var k in priceSize) {
                    new Promise(function (resolve, reject) {
                        client1.query(constants.SQL.CREATE_PRODUCT_SIZE, [priceSize[k].price, tax, activeFlag, createdBy
                            , createdDateTime, modifiedDateTime, modifiedBy, priceSize[k].size], function (err, res) {
                            if (err) {
                                console.log(err);
                            }
                            else result += res;
                        });
                    })
                }
                return result;
            }).then(function (result) {
                client1.query('COMMIT', (err) => {
                    if (err) {
                        console.error('Error committing transaction', err.stack);
                    } else
                        return (result);
                    console.log(result);
                    //done()
                });
            });

        /*promise.then(function () {
                console.log('Before Begin');
                client1.query('BEGIN', function (err) {
                    console.log('In Begin');
                    if (shouldAbort(err)) reject(err);
                    client1.query(constants.SQL.CREATE_PRODUCT, [cafeId, pName, activeFlag, createdBy, createdDateTime, modifiedDateTime, modifiedBy, pDesc],
                        (err, res) => {
                            console.log('In First Query');
                            if (shouldAbort(err)) {
                                reject(err);
                            }
                            else
                                console.log(res);
                        }).then( () => {
                        console.log('In First Then');
                        for (var k in priceSize) {
                             new Promise(function (resolve, reject) {
                                client1.query(constants.SQL.CREATE_PRODUCT_SIZE, [priceSize[k].price, tax, activeFlag, createdBy
                                    , createdDateTime, modifiedDateTime, modifiedBy, priceSize[k].size], function(err, res ) {
                                    if(err) {
                                        reject(err);
                                    }
                                    else result += res;
                                });
                            })
                        }
                    })
                        .then(client1.query('COMMIT', (err) => {
                            if (err) {
                                console.error('Error committing transaction', err.stack);
                            }else
                                resolve(result);
                            console.log(result);
                            //done()
                        }))
                })
            })*/
        return promise;
};