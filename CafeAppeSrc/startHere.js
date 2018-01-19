var url = require('url');
var express = require('./node-postgres-todo/node_modules/express');
var constants = require('./CafeAppeClient/resources/mappings');
var path = require('path');
var utils = require('./CafeAppeClient/resources/utils');

var querystring = require('querystring');



var app = express();

var bodyParser = require("./node-postgres-todo/node_modules/body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.sendFile(path.resolve(constants.PATH.PROJECT_PATH + constants.PATH.ADMIN_PAGE_PATH));
});

app.get('/manageOffer', function (req, res) {
    res.sendFile(path.resolve(constants.PATH.PROJECT_PATH + constants.PATH.MANAGE_OFFERS_PATH));
});

app.get('/addCafe', function (req, res) {
    res.sendFile(path.resolve(constants.PATH.PROJECT_PATH + constants.PATH.ADD_CAFE_PATH));
});

app.post('/addCafeSubmit', function (req, res) {
  utils.persistenceServiceCallWithParams(querystring.stringify({
      cafeName: req.body.cafeName,
      unitNumber: req.body.unitNumber,
      streetName: req.body.streetName,
      state: req.body.state,
      postcode: req.body.postcode,
      suburb: req.body.suburb
  }),'/addNewCafe').then(function(fulfilled){
      utils.redirectToURL(res, '/viewCafe');
    }).catch(function(error){ console.log(error); });
});

app.post('/addOfferSubmit', function (req, res) {
  utils.persistenceServiceCallWithParams(querystring.stringify({
      promocode: req.body.promocode,
      discount: req.body.discount,
      cafes: req.body.cafes,
      product: req.body.product,
      sold: req.body.sold,
      billed: req.body.billed,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end
  }),'/addNewOffer').then(function(fulfilled){
      utils.redirectToURL(res, '/manageOffer');
    }).catch(function(error){ console.log(error); });
});

app.post('/updateCafeDetails', function (req, res) {
  utils.persistenceServiceCallWithParams(querystring.stringify({
      cafeName: req.body.cafe_name,
      unitNumber: req.body.cafe_unitnumber,
      streetName: req.body.cafe_streetname,
      state: req.body.cafe_stateid,
      suburb: req.body.suburb,
      cafeid: req.body.cafe_id
  }),'/updateCafeInformation').then(function(fulfilled){
    utils.redirectToURL(res, '/viewCafe');
    }).catch(function(error){ console.log(error); });
});

app.get('/viewCafe', function (req, res) {
    res.sendFile(path.resolve(constants.PATH.PROJECT_PATH + constants.PATH.VIEW_CAFE_PATH));
});

app.get('/manageOrders', function (req, res) {
  res.sendFile(path.resolve(constants.PATH.PROJECT_PATH + constants.PATH.MANAGE_ORDERS_PATH));
});

app.get('/pendingOrders', function (req, res) {
  res.sendFile(path.resolve(constants.PATH.PROJECT_PATH + constants.PATH.PENDING_ORDERS_PATH));
});

app.get('/deliveredOrders', function (req, res) {
  res.sendFile(path.resolve(constants.PATH.PROJECT_PATH + constants.PATH.DELIVERED_ORDERS_PATH));
});

app.get('/canceledOrders', function (req, res) {
  res.sendFile(path.resolve(constants.PATH.PROJECT_PATH + constants.PATH.CANCELED_ORDERS_PATH));
});

app.post('/getOrderItemsByOrderId', function (req, res) {
  utils.persistenceServiceCallWithParamsAndResponse(querystring.stringify({
    orderId: req.query.orderId
  }), '/getOrderItems').then(function(fulfilled){
    var result = [];
    for(var k in JSON.parse(fulfilled).rows) {
      var temp = JSON.parse(fulfilled).rows[k];
      result.push({productname:temp.productname,productsizeid:temp.productsizeid,quantity: temp.quantity,
      itemcost:temp.itemcost,isItemReady: temp.isitemready});
    }
    res.contentType('application/json');
    res.json(result);
  }).catch(function(error){
    console.log(error);
  });
});

app.post('/getCafeOrders', function (req, res) {
  utils.persistenceServiceCallWithParamsAndResponse(querystring.stringify({
      cafeid: req.query.cafeId,
      action: req.query.action
  }),'/getOrdersByCafeId').then(function(fulfilled){
    var result = [];
    for(var k in JSON.parse(fulfilled).rows) {
      var temp = JSON.parse(fulfilled).rows[k];
      result.push({cafeid:temp.cafeid,orderid:temp.orderid,userid: temp.userid,
      promocode:temp.promocode,locationid: temp.locationid, deliverytime: temp.expecteddeliverytime,
      ordertime: temp.orderplacedat, isdeliveredflag: temp.isdeliveredflag,
      ordertypeid: temp.ordertypeid, iscancelledflag: temp.iscancelledflag});
    }
    res.contentType('application/json');
    res.json(result);
  }).catch(function(error){
    console.log(error);
  });
});

app.get('/archiveCafe', function (req, res) {
  console.log(req.query.cafeId);
    utils.persistenceServiceCallWithParams(querystring.stringify({
        cafeId: req.query.cafeId
    }), '/setCafeActiveFlagFalse').then(function(fulfilled){
        utils.redirectToURL(res, '/viewCafe');
    }).catch(function(){
      console.log(error);
    });
});

app.get('/reopenArchiveCafe', function (req, res) {
    utils.persistenceServiceCallWithParams(querystring.stringify({
        cafeId: req.query.cafeId
    }), '/setCafeActiveFlagTrue').then(function(fulfilled){
      utils.redirectToURL(res, '/archivedCafe');
    }).catch(function(){
      console.log(error);
    });
});

app.post('/getCafeList', function (req, res) {
  utils.persistenceServiceCallSansParams('/getCafes').then(function(fulfilled){
    var result = [];
    for(var k in JSON.parse(fulfilled).rows) {
      var temp = JSON.parse(fulfilled).rows[k];
      result.push({cafeid:temp.cafeid,cafename:temp.cafename,address: temp.unitnumber+", "+temp.streetname+", "+temp.stateid});
    }
    res.contentType('application/json');
    res.send(JSON.stringify(result));
    res.end();
  }).catch(function(error){
    console.log(error);
  });
});

app.post('/getCafeListForPromo', function (req, res) {
  utils.persistenceServiceCallSansParams('/getCafes').then(function(fulfilled){
    var result = [];
    for(var k in JSON.parse(fulfilled).rows) {
      var temp = JSON.parse(fulfilled).rows[k];
      result.push({id:temp.cafeid,text:temp.cafename});
    }
    res.contentType('application/json');
    res.send(JSON.stringify(result));
    res.end();
  }).catch(function(error){
    console.log(error);
  });
});

app.post('/getProductListForCafeIds', function(req, res){
  utils.persistenceServiceCallWithParamsAndResponse(
    querystring.stringify({
        cafeIds: req.query.array
    }),
    '/getProductsForCafeIds'
  ).then(function(fulfilled){
    console.log(fulfilled);
    var result = [];
    for(var k in JSON.parse(fulfilled).rows) {
      var temp = JSON.parse(fulfilled).rows[k];
      result.push({id:temp.suburbid,text:temp.suburbname});
    }
    res.contentType('application/json');
    res.send(JSON.stringify(result));
    res.end();
  }).catch(function(error){
    console.log(error);
  });
});

app.post('/getOfferList', function (req, res) {
  utils.persistenceServiceCallSansParams('/getOffers').then(function(fulfilled){
    var result = [];
    for(var k in JSON.parse(fulfilled).rows) {
      var temp = JSON.parse(fulfilled).rows[k];
      result.push({promocode:temp.promocode,description:temp.description, discount: temp.discount, productid: temp.productid,
         cafeid: temp.cafeid, startdate:temp.startdate, enddate: temp.enddate, createdby: temp.createdby, createddatetime: temp.createddatetime,
         modifiedby: temp.modifiedby, modifieddatetime: temp.modifieddatetime, billedquantity: temp.billedquantity, soldquantity: temp.soldquantity});
    }
    res.contentType('application/json');
    res.send(JSON.stringify(result));
    res.end();
  }).catch(function(error){
    console.log(error);
  });
});

app.post('/getArchivedCafeList', function (req, res) {
  utils.persistenceServiceCallSansParams('/getArchivedCafes').then(function(fulfilled){
    var result = [];
    for(var k in JSON.parse(fulfilled).rows) {
      var temp = JSON.parse(fulfilled).rows[k];
      result.push({cafeid:temp.cafeid,cafename:temp.cafename,address: temp.unitnumber+", "+temp.streetname+", "+temp.stateid});
    }
    res.contentType('application/json');
    res.send(JSON.stringify(result));
    res.end();
  }).catch(function(error){
    console.log(error);
  });
});

app.post('/addProductSubmit', function(req, res) {
      utils.persistenceServiceCallWithParams(querystring.stringify({
          pName: req.body.pNewName,
          pDesc: req.body.pNewDesc,
          pSize: req.body.pNewSize,
          pPrice: req.body.pNewPrice
      }),'/addProductSubmits').then(function(fulfilled){
            utils.redirectToURL(res, '/viewProduct');
        }).catch(function(error){
            console.log(error);
        });
});

app.post('/getProductList', function (req, res) {
        utils.persistenceServiceCallSansParams('/getProductsList').then(function(fulfilled){
            var result = [];
            for(var k in JSON.parse(fulfilled).rows) {
                var temp = JSON.parse(fulfilled).rows[k];
                result.push({productid:temp.productid, productname:temp.productname, productsize:temp.productsizeid, productprice:temp.price});
            }
            res.contentType('application/json');
            res.send(JSON.stringify(result));
            res.end();
        }).catch(function(error){
            console.log(error);
        });
});

app.post('/getStatesList', function (req, res) {
  utils.persistenceServiceCallSansParams('/getStates').then(function(fulfilled){
    var result = [];
    for(var k in JSON.parse(fulfilled).rows) {
      var temp = JSON.parse(fulfilled).rows[k];
      result.push({id:temp.stateid,text:temp.statename});
    }
    res.contentType('application/json');
    res.send(JSON.stringify(result));
    res.end();
  }).catch(function(error){
    console.log(error);
  });
});

app.post('/getSuburbList', function (req, res) {
  utils.persistenceServiceCallWithParamsAndResponse(querystring.stringify({
      stateId: req.query.stateId
    }),'/getSuburbs').then(function(fulfilled){
    var result = [];
    for(var k in JSON.parse(fulfilled).rows) {
      var temp = JSON.parse(fulfilled).rows[k];
      result.push({id:temp.suburbid,text:temp.suburbname});
    }
    res.contentType('application/json');
    res.send(JSON.stringify(result));
    res.end();
  }).catch(function(error){
  console.log(error);
  });
});


app.get('/cafeAdmin', function (req, res) {
    console.log(req.query.cafeId);
    res.sendFile(path.resolve(constants.PATH.PROJECT_PATH + constants.PATH.CAFE_ADMIN_PATH));
});

app.get('/viewProduct', function (req, res) {
    res.sendFile(path.resolve(constants.PATH.PROJECT_PATH + constants.PATH.VIEW_PRODUCT_PATH));
});

app.get('/archivedCafe', function (req, res) {
    res.sendFile(path.resolve(constants.PATH.PROJECT_PATH + constants.PATH.VIEW_ARCHIVED_CAFES));
});

app.get('/addProduct', function (req, res) {
    res.sendFile(path.resolve(constants.PATH.PROJECT_PATH + constants.PATH.ADD_PRODUCT_PATH));
});


app.get('/getSelectedProduct', function(req, res) {
    console.log('In here');
    res.sendFile(constants.PATH.PROJECT_PATH + constants.PATH.MANAGE_PRODUCT_PATH);
});


app.get('/getProductSelected', function(req, res) {

    utils.persistenceServiceCallWithParamsAndResponse(querystring.stringify({
        id: req.query.id
    }),'/getProduct').then(function(fulfilled){
        var temp = JSON.parse(fulfilled).rows[0];
        var result = {
            pName: temp.productname,
            pDesc: 'adsssaf',
            pSize: temp.productsizeid,
            pPrice: temp.price
        }
        res.contentType('application/json');
        res.send(JSON.stringify(result));
        //console.log('asdasdsad');
        res.end();
    }).catch(function(error){
        console.log(error);
    });
});

app.get('/completeOrder', function (req, res) {
    utils.persistenceServiceCallWithParams(querystring.stringify({
      orderid: req.query.orderid
    }),'/completeOrderByOrderId' ).then(function(fulfilled){
      utils.redirectToURL(res, '/pendingOrders');
    }).catch(function(error){
        console.log(error);
    });
});

app.get('/undoCancelOrder', function (req, res) {
    utils.persistenceServiceCallWithParams(querystring.stringify({
      orderid: req.query.orderid
    }),'/undoCancelOrderByOrderId' ).then(function(fulfilled){
      utils.redirectToURL(res, '/canceledOrders');
    }).catch(function(error){
        console.log(error);
    });
});

app.get('/undoCompleteOrder', function (req, res) {
    utils.persistenceServiceCallWithParams(querystring.stringify({
      orderid: req.query.orderid
    }),'/undoCompletedOrderByOrderId' ).then(function(fulfilled){
      utils.redirectToURL(res, '/deliveredOrders');
    }).catch(function(error){
        console.log(error);
    });
});

app.post('/cancelOrder', function (req, res) {
    utils.persistenceServiceCallWithParams(querystring.stringify({
      orderid: req.body.cancelOrderId
    }),'/cancelOrderByOrderId' ).then(function(fulfilled){
      console.log('returned to client');
      utils.redirectToURL(res, '/pendingOrders'+req.body.cafeidfield);
    }).catch(function(error){
        console.log(error);
    });
});

app.post('/UpdateProductSubmit', function(req, res) {
    utils.persistenceServiceCallWithParams(querystring.stringify({
        pName: req.body.pUpdateName,
        pDesc: req.body.pUpdateDesc,
        pSize: req.body.pUpdateSize,
        pPrice: req.body.pUpdatePrice,
        pId: req.body.productId
    }),'/updateProductSubmits').then(function(fulfilled){
        console.log(fulfilled);
        utils.redirectToURL(res, '/viewProduct');
    }).catch(function(error){
        console.log(error);
    });
});


app.get('/getProductToArchive', function(req, res) {
    console.log(req.query.id);
    utils.persistenceServiceCallWithParams(querystring.stringify({
        pId: req.query.id
    }),'/archiveProduct').then(function(fulfilled){
        utils.redirectToURL(res, '/viewProduct');
    }).catch(function(error){
        console.log(error);
    });
});


var server = app.listen(63342, function () {
    console.log('Node server is running..');
});
