var connPool = require('../resources/postgresdb');
var constants = require('../resources/constants');

module.exports.addNewCafe = (name,createdby, modifiedby) => { return new Promise(
      function (resolve, reject) {
      connPool.query(
          constants.SQL.ADD_NEW_CAFE, [name,createdby, modifiedby],
          function(err, res ) {
              if(err) {
                reject(err);
              }
              else resolve();
          });
    }
);
};

module.exports.addNewAddress = (unitNumber, streetName, suburbId) => { return new Promise(
  function (resolve, reject) {
     connPool.query(
          constants.SQL.ADD_NEW_ADDRESS, [unitNumber, streetName, suburbId],function(err, res ) {
              if(err) {
                reject(err);
              }
              else resolve();
          });
    }
  );
};

module.exports.addNewLocation = ( longitude, latitude) => { return new Promise(
    function (resolve, reject) {
      connPool.query(
          constants.SQL.ADD_NEW_LOCATION, [longitude, latitude],function(err, res ) {
              if(err) {
                reject(err);
              }
              else resolve();
          });
    }
);
};

module.exports.getCafeList = () => {
  return new Promise(function (resolve, reject) {
      connPool.query(
          constants.SQL.GET_ALL_CAFES, function(err, res ) {
              if(err) {
                reject(err);
              }
              else{
                resolve(JSON.stringify(res));
              }
          });
    }
);
};

module.exports.getOfferList = () => {
  return new Promise(function (resolve, reject) {
      connPool.query(
          constants.SQL.GET_ALL_OFFERS, function(err, res ) {
              if(err) {
                reject(err);
              }
              else{
                resolve(JSON.stringify(res));
              }
          });
    }
);
};

module.exports.getArchivedCafeList = () => {
  return new Promise(function (resolve, reject) {
      connPool.query(
          constants.SQL.GET_ARCHIVED_CAFES, function(err, res ) {
              if(err) {
                reject(err);
              }
              else{
                resolve(JSON.stringify(res));
              }
          });
    }
);
};

module.exports.setCafeActiveFlagFalse = (cafeId) => {
  return new Promise(function (resolve, reject) {
    connPool.query(
      constants.SQL.SET_ACTIVE_CAFE_FALSE, [cafeId], function(err, res){
        if(err)  {
          reject(err);
        }
        else {
          resolve();
        }
      }
    );
  });
};

module.exports.setCafeActiveFlagTrue = (cafeId) => {
  return new Promise(function (resolve, reject) {
    connPool.query(
      constants.SQL.SET_ACTIVE_CAFE_TRUE, [cafeId], function(err, res){
        if(err)  {
          reject(err);
        }
        else {
          resolve();
        }
      }
    );
  });
};


module.exports.updateAddress = (unitNumber, streetName, suburbId, cafeId) => {
  return new Promise(
  function (resolve, reject) {
     connPool.query(
          constants.SQL.UPDATE_ADDRESS, [unitNumber, streetName, suburbId, cafeId],function(err, res ) {
              if(err) {
                reject(err);
              }
              else {
                resolve();
              }
          });
    }
  );
};

module.exports.updateCafe = (cafeId, cafeName, modifiedby) => {

  return new Promise( function (resolve, reject){
    connPool.query(
      constants.SQL.UPDATE_CAFE_INFO, [cafeName, modifiedby, cafeId], function(err, res){
        if(err) {
          console.log(err);
          reject(err);
        } else{
          resolve();
        }
      }
    );
  });
};

module.exports.getOrdersByCafeId = (cafeid, isDelivered, isCancelled) => {
  return new Promise( function (resolve, reject){
    connPool.query(
      constants.SQL.GET_ORDERS_BY_CAFE_ID, [cafeid, isDelivered, isCancelled], function(err, res){
        if(err) {
          console.log(err);
          reject(err);
        } else{
          resolve(JSON.stringify(res));
        }
      });
    });
}

module.exports.getOrderItemsByOrderId = (orderId) => {
  return new Promise(function(resolve, reject){
    connPool.query(constants.SQL.GET_ORDER_ITEMS_BY_ORDER_ID, [orderId],function(err, res){
      if(err){
        reject(err);
      } else {
        resolve(JSON.stringify(res));
      }
    });
  });
}

module.exports.completeOrderByOrderId = (orderId) => {
  return new Promise(function(resolve, reject){
    connPool.query(constants.SQL.COMPLETE_ORDER_BY_ORDER_ID, [orderId],function(err, res){
      if(err){
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

module.exports.markOrderItemsCompleted = (orderId) => {
  return new Promise(function(resolve, reject){
    connPool.query(constants.SQL.COMPLETE_ALL_ITEMS_FOR_ORDER_ID, [orderId],function(err, res){
      if(err){
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

module.exports.cancelOrderByOrderId = (orderId) => {
  return new Promise(function(resolve, reject){
    console.log(orderId);
    connPool.query(constants.SQL.CANCEL_ORDER_BY_ORDER_ID, [orderId],function(err, res){
      if(err){
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

module.exports.undoCancelOrderByOrderId = (orderId) => {
  return new Promise(function(resolve, reject){
    connPool.query(constants.SQL.UNDO_CANCEL_ORDER_BY_ORDER_ID, [orderId],function(err, res){
      if(err){
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

module.exports.undoCompletedOrderByOrderId = (orderId) => {
  return new Promise(function(resolve, reject){
    connPool.query(constants.SQL.UNDO_COMPLETED_ORDER_BY_ORDER_ID, [orderId],function(err, res){
      if(err){
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

module.exports.addNewOffer = (params) => { return new Promise(
      function (resolve, reject) {
      connPool.query(
          constants.SQL.ADD_NEW_OFFER, [params.promocode,params.discount,params.start,params.end,params.billed,params.sold,params.description],
          function(err, res ) {
              if(err) {
                reject(err);
              }
              else resolve();
          });
    }
);
};

module.exports.addProductsForOffer = (params) => { return new Promise(
  function (resolve, reject) {
    for(var a in params.product){
      insertProductOfferMapping(params.promocode, params.product[a]).
      catch(function(error){
        reject(error);
      });
    }
    resolve();

    }
  );
};

function insertProductOfferMapping(promocode, product){
  return new Promise(function (resolve,reject){
    connPool.query(
         constants.SQL.ADD_PRODUCTS_FOR_NEW_OFFER, [promocode, product],function(err, res ) {
             if(err) {
               reject(err);
             }
             else{
               resolve();
             }
         });
  });
}

module.exports.addCafesForOffer = ( params) => { return new Promise(
    function (resolve, reject) {
      for(var a in params.cafes){
        insertCafeOfferMapping(params.promocode, params.cafes[a]).
        catch(function(error){
          reject(error);
        });
      }
      resolve();
    }
);
};

function insertCafeOfferMapping(promocode, cafeid){
  return new Promise(function (resolve,reject){
    connPool.query(
        constants.SQL.ADD_CAFES_FOR_NEW_OFFER, [promocode, cafeid],function(err, res ) {
            if(err) {
              reject(err);
            }
            else{
              resolve();
            }
        });
  });
}

module.exports.getProductsForCafeIds = (cafeIDs) => { return new Promise(
    function (resolve, reject) {
      var params = [];
      for(var i = 1; i <= cafeIDs.length; i++) {
        params.push('$' + i);
      }
      var queryText = constants.SQL.GET_PRODUCTS_FOR_CAFE_IDS + params.join(',') + ')';
      connPool.query(queryText
          , cafeIDs,function(err, res ) {
              if(err) {
                reject(err);
              }
              else{
                resolve(res);
              }
          });
    }
);
};
