var express = require('../node-postgres-todo/node_modules/express');

var constants = require('./resources/constants');
 var productDAO = require('./DAO/ProductDAO');
 var cafeDAO = require('./DAO/CafeDAO');
 var generalDAO = require('./DAO/GeneralDAO');

var app = express();
var bodyParser = require("../node-postgres-todo/node_modules/body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/getCafes', function (req, res){
    cafeDAO.getCafeList().then(function(fulfilled){
      return res.send(fulfilled);
    }).catch(function (error) {
      console.log(error);
    });
});

app.post('/getProductsForCafeIds', function (req, res){
    cafeDAO.getProductsForCafeIds(req.body.cafeIds).then(function(fulfilled){
      return res.send(fulfilled);
    }).catch(function (error) {
      console.log(error);
    });
});

app.post('/getOffers', function (req, res){
    cafeDAO.getOfferList().then(function(fulfilled){
      return res.send(fulfilled);
    }).catch(function (error) {
      console.log(error);
    });
});

app.post('/getArchivedCafes', function (req, res){
    cafeDAO.getArchivedCafeList().then(function(fulfilled){
      return res.send(fulfilled);
    }).catch(function (error) {
      console.log(error);
    });
});

app.post('/getOrdersByCafeId', function (req, res){
    if(req.body.action == 'pending'){
      cafeDAO.getOrdersByCafeId(req.body.cafeid, false, false).then(function(fulfilled){
        return res.send(fulfilled);
      }).catch(function (error) {
        console.log(error);
      });
    } else if (req.body.action == 'delivered') {
      cafeDAO.getOrdersByCafeId(req.body.cafeid, true, false).then(function(fulfilled){
        return res.send(fulfilled);
      }).catch(function (error) {
        console.log(error);
      });
    } else if (req.body.action == 'canceled') {
      cafeDAO.getOrdersByCafeId(req.body.cafeid, false, true).then(function(fulfilled){
        return res.send(fulfilled);
      }).catch(function (error) {
        console.log(error);
      });
    } else {
      console.log('Invalid request');
    }
});

app.post('/getOrderItems',function(req, res){
  cafeDAO.getOrderItemsByOrderId(req.body.orderId).then(function(fulfilled){
    return res.send(fulfilled);
  }).catch(function(error){
    console.log(error);
  });
});

app.post('/getStates', function (req, res){
      generalDAO.getStates.then(function(fulfilled){
      return res.send(fulfilled);
    }).catch(function (error) {
      console.log(error);
    });
});

app.post('/completeOrderByOrderId', function (req, res){
  cafeDAO.markOrderItemsCompleted(req.body.orderid).then(function(fulfilled){
    cafeDAO.completeOrderByOrderId(req.body.orderid);
  }).catch(function(error){
        console.log(error);
      })
});

app.post('/undoCancelOrderByOrderId', function (req, res){
  cafeDAO.undoCancelOrderByOrderId(req.body.orderid).catch(function(error){
        console.log(error);
      })
});

app.post('/undoCompletedOrderByOrderId', function (req, res){
  cafeDAO.undoCompletedOrderByOrderId(req.body.orderid).catch(function(error){
        console.log(error);
      })
});

app.post('/cancelOrderByOrderId', function (req, res){
  console.log('trying to cancel');
  cafeDAO.cancelOrderByOrderId(req.body.orderid).catch(function(error){
        console.log(error);
      })
});

app.post('/getSuburbs', function (req, res){
      generalDAO.getSuburbs(req.body.stateId).then(function(fulfilled){
      return res.send(fulfilled);
    }).catch(function (error) {
      console.log(error);
    });
});

app.post('/updateCafeInformation', function (req, res){
    cafeDAO.updateAddress(req.body.unitNumber, req.body.streetName, 5599 /*req.body.suburb*/, req.body.cafeid).then(
        cafeDAO.updateCafe( req.body.cafeid, req.body.cafeName, 1)).catch(function (error){
          console.log(error);
        });
});

app.post('/addNewCafe', function (req, res){
    cafeDAO.addNewLocation(10, 10).then(
      cafeDAO.addNewAddress(req.body.unitNumber, req.body.streetName, req.body.suburb)).then(
        cafeDAO.addNewCafe( req.body.cafeName, 1, 1)).catch(function (error){
          console.log(error);
        });
});

app.post('/addNewOffer', function (req, res){
    cafeDAO.addNewOffer(req.body).then(
      cafeDAO.addProductsForOffer(req.body)
    ).then(
      cafeDAO.addCafesForOffer(req.body)
    ).catch(function(error){
      console.log(error);
    });
});

app.post('/setCafeActiveFlagFalse', function (req, res){
    cafeDAO.setCafeActiveFlagFalse(req.body.cafeId).catch(function (error){
          console.log(error);
        });
});

app.post('/setCafeActiveFlagTrue', function (req, res){
    cafeDAO.setCafeActiveFlagTrue(req.body.cafeId).catch(function (error){
          console.log(error);
        });
});

app.post('/addProductSubmits', function (req, res){
    //console.log(req.body.price);
    var result = '';
    var a = function() {
        productDAO.createProductPromise(1, req.body.name, true, 1, new Date(), new Date(), 1, req.body.desc)
            .then(function (fulfilled) {
                //return res.send(fulfilled);
            }).then(function(){
                var pricesSize = JSON.parse(req.body.priceSize);
                console.log(pricesSize);
                    for( var k in pricesSize){
                        productDAO.createProductSizePromise(1,1, pricesSize[k].price , 1.12, true, 1, new Date(), new Date(), 1, pricesSize[k].size)
                            .then(function(fulfilled){
                                console.log(fulfilled);
                                result += fulfilled;
                            }).catch(function (error) {
                            console.log(error);
                        });
                    }
                return res.send(result);
        }).catch(function (error) {
                console.log(error);
            });
    }
    return a();
});


app.post('/getProductsList', function (req, res){
    var a = function(){
        productDAO.viewProduct().then(function(fulfilled){
           // console.log(fulfilled);
            return res.send(fulfilled);
        }).catch(function (error) {
            console.log(error);
        });
    }
    return a();
});

app.post('/getProduct', function (req, res){
    var a = function(){
        productDAO.getProduct(req.body.id).then(function(fulfilled){
            return res.send(fulfilled);
        }).catch(function (error) {
            console.log(error);
        });
    }
    return a();
});


app.post('/updateProductSubmits', function (req, res){
    var a = function() {
        productDAO.updateProductPromise(req.body.pId, req.body.pName, new Date(), 1, req.body.pDesc)
            .then(function (fulfilled) {
            }).then(productDAO.updateProductSizePromise(req.body.pId,req.body.pSizeId, req.body.pPrice , new Date(), 1, req.body.pSize).then(
            function (fulfilled) {
                return res.send(fulfilled);
            }).catch(function (error) {
            console.log(error);
        })
            .catch(function (error) {
                console.log(error);
            }));
    }
    return a();
});


app.post('/archiveProduct', function (req, res){
    var a = function() {
        productDAO.archiveProduct(req.body.pId)
            .then(function (fulfilled) {
            }).then(productDAO.archiveProductSize(req.body.pId, req.body.pSizeId).then(
            function (fulfilled) {
                return res.send(fulfilled);
            }).catch(function (error) {
            console.log(error);
        })
            .catch(function (error) {
                console.log(error);
            }));
    }
    return a();
});


app.post('/deleteMenu', function (req, res){
    var a = function() {
        productDAO.deleteMenu(req.body.cafeId)
            .then(function (fulfilled) {
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return a();
});

app.post('/createMenuSubmit', function (req, res){
    var a = function() {
        productDAO.createMenuPromise(1, req.body.pName, req.body.pDesc, req.body.pSize, req.body.pPrice, 1, new Date(), 1, new Date())
            .then(function (fulfilled) {
                return res.send(fulfilled);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return a();
});


app.post('/viewMenu', function (req, res){
    var a = function(){
        productDAO.viewMenu().then(function(fulfilled){
            return res.send(fulfilled);
        }).catch(function (error) {
            console.log(error);
        });
    }
    return a();
});

var server = app.listen(5001, function () {
    console.log('Node server is running..');
});
