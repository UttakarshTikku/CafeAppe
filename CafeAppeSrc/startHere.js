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

        //var PriceSize = JSON.parse(req.body.pPriceHidden);
        //console.log(PriceSize);
      utils.persistenceServiceCallWithParams(querystring.stringify({
          name: req.body.pNewName,
          desc: req.body.pNewDesc,
          priceSize: req.body.pPriceHidden
      }),'/addProductSubmits1').then(function(fulfilled){
            res.writeHead(302,{
             'Location': '/viewProduct'
            });
            res.end();
        }).catch(function(error){
            console.log(error);
        });
});

app.post('/getProductList', function (req, res) {
        utils.persistenceServiceCallSansParams('/getProductsList').then(function(fulfilled){
            var result = [];
            for(var k in JSON.parse(fulfilled).rows) {
                var temp = JSON.parse(fulfilled).rows[k];
                result.push({productid:temp.productid,
                    productname:temp.productname,
                    productsize:temp.size,
                    productprice:temp.price,
                    productsizeid:temp.productsizeid,
                    productdescription:temp.description});
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

app.get('/Menu', function (req, res) {
    res.sendFile(path.resolve(constants.PATH.PROJECT_PATH + constants.PATH.MENU_PATH));
});

app.get('/openMenu', function (req, res) {
    res.sendFile(path.resolve(constants.PATH.PROJECT_PATH + constants.PATH.OPEN_MENU_PATH));
});

app.get('/manageOffers', function (req, res) {
    res.sendFile(path.resolve(constants.PATH.PROJECT_PATH + constants.PATH.MANAGE_OFFERS_PATH));
});

app.get('/manageRewards', function (req, res) {
    res.sendFile(path.resolve(constants.PATH.PROJECT_PATH + constants.PATH.MANAGE_REWARDS_PATH));
});

app.get('/admin', function (req, res) {
    res.sendFile(path.resolve(constants.PATH.PROJECT_PATH + constants.PATH.ADMIN_PAGE_PATH));
});

app.get('/addOns', function (req, res) {
    res.sendFile(path.resolve(constants.PATH.PROJECT_PATH + constants.PATH.ADDONS_PATH));
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
        pId: req.body.productId,
        pSizeId: req.body.hiddenUpdateProductSizeId
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
        pId: req.query.id,
        pSizeId: req.query.sizeid
    }),'/archiveProduct').then(function(fulfilled){
        utils.redirectToURL(res, '/viewProduct');
    }).catch(function(error){
        console.log(error);
    });
});


app.post('/createMenu', function(req, res) {
    var dataToBeInserted = JSON.parse(req.body.menu);
   //console.log(combinedData);
    utils.persistenceServiceCallWithParams(querystring.stringify({
        cafeId: 1,
        userId: 1
    }),'/deleteMenu').then(function(fulfilled){
        for(var k in dataToBeInserted.rows){
            utils.persistenceServiceCallWithParams(querystring.stringify({
                /*pName: dataToBeInserted.rows[k].productname,
                pDesc: dataToBeInserted.rows[k].productdescription,
                pSize: dataToBeInserted.rows[k].productsize,
                pPrice: dataToBeInserted.rows[k].productprice,*/
                cafeId: 1,
                pId: dataToBeInserted.rows[k].productid,
                psId: dataToBeInserted.rows[k].productsizeid
            }),'/createMenuSubmit').then(function(fulfilled1){
                //console.log(fulfilled1);
            }).catch(function(error){
                console.log(error);
            });
        }
        res.writeHead(302,{
            'Location': '/Menu'
        });
        res.end();
    }).catch(function(error){
        console.log(error);
    });
});


app.post('/getMenuList', function (req, res) {
    utils.persistenceServiceCallSansParams('/viewMenu').then(function(fulfilled){
        var result = [];
        //console.log(fulfilled);
        for(var k in JSON.parse(fulfilled).rows) {
            var temp = JSON.parse(fulfilled).rows[k];
            result.push({
                productid: temp.productid,
                productname:temp.productname,
                productdescription:temp.description,
                productsizeid:temp.productsizeid,
                productsize:temp.size,
                productprice:temp.price
                });
        }
        var combinedData = [];
        var data = {};
        for(var i=0; i< result.length; i++){
            if(combinedData.length == 0){
                if (result[i].productsize === 'small') {
                    combinedData.push({
                        name: result[i].productname,
                        desc: result[i].productdescription,
                        priceSmall: result[i].productprice,
                        priceMedium: 'N/A',
                        priceLarge: 'N/A',
                    });
                } else if (result[i].productsize === 'medium') {
                    combinedData.push({
                        name: result[i].productname,
                        desc: result[i].productdescription,
                        priceMedium: result[i].productprice,
                        priceSmall: 'N/A',
                        priceLarge: 'N/A',
                    });
                }
                else if (result[i].productsize === 'large') {
                    combinedData.push({
                        name: result[i].productname,
                        desc: result[i].productdescription,
                        priceLarge: result[i].productprice,
                        priceMedium: 'N/A',
                        priceSmall: 'N/A',
                    });
                }
            } else {
                for(var j=0; j< combinedData.length; j++){
                    if(result[i].productname === combinedData[j].name){
                        if (result[i].productsize === 'small') {
                            data = {
                                value: j,
                                priceType : 'priceSmall',
                                price: result[i].productprice,
                            };
                        } else if (result[i].productsize === 'medium') {
                            data = {
                                value: j,
                                priceType: 'priceMedium',
                                price: result[i].productprice,
                            };
                        }
                        else if (result[i].productsize === 'large') {
                            data = {
                                value: j,
                                priceType: 'priceLarge',
                                price: result[i].productprice,
                            };
                        }
                    }
                }
                if(Object.keys(data).length === 0 && data.constructor === Object){
                    //console.log('inside if statement of empty data');
                    if (result[i].productsize === 'small' || result[i].productsize === 's') {
                        combinedData.push({
                            name: result[i].productname,
                            desc: result[i].productdescription,
                            priceSmall: result[i].productprice,
                            priceMedium: 'N/A',
                            priceLarge: 'N/A',
                        });
                    } else if (result[i].productsize === 'medium') {
                        combinedData.push({
                            name: result[i].productname,
                            desc: result[i].productdescription,
                            priceMedium: result[i].productprice,
                            priceSmall: 'N/A',
                            priceLarge: 'N/A',
                        });
                    }
                    else if (result[i].productsize === 'large') {
                        combinedData.push({
                            name: result[i].productname,
                            desc: result[i].productdescription,
                            priceLarge: result[i].productprice,
                            priceMedium: 'N/A',
                            priceSmall: 'N/A',
                        });
                    }
                } else{
                    combinedData[data.value][data.priceType] = data.price;
                    data = {};
                }
            }

        }

        res.contentType('application/json');
        res.send(JSON.stringify(combinedData));
    }).catch(function(error){
        console.log(error);
    });
});

app.get('/getMenuList', function (req, res) {
    utils.persistenceServiceCallSansParams('/viewMenu').then(function(fulfilled){
        var result = [];
        for(var k in JSON.parse(fulfilled).rows) {
            var temp = JSON.parse(fulfilled).rows[k];
            result.push({
                productid: temp.productid,
                productname:temp.productname,
                productdescription:temp.description,
                productsizeid: temp.productsizeid,
                productsize:temp.size,
                productprice:temp.price
            });
        }
        res.contentType('application/json');
        res.send(JSON.stringify(result));
    }).catch(function(error){
        console.log(error);
    });
});

app.post('/addCafeProgram', function(req, res) {
    utils.persistenceServiceCallWithParams(querystring.stringify({
        name: req.body.programName,
        cafes: req.body.cafes,
        threshold: req.body.rewardThreshold,
        visitPoints: req.body.visitPoints,
        paybackPoints: req.body.paybackPoints
    }),'/addCafePrograms').then(function(fulfilled){
        res.writeHead(302,{
            'Location': '/manageRewards'
        });
        res.end();
    }).catch(function(error){
        console.log(error);
    });
});


app.post('/getCafePrograms', function (req, res) {
    utils.persistenceServiceCallSansParams('/getCafePrograms').then(function(fulfilled){
        var result = [];
        for(var k in JSON.parse(fulfilled).rows) {
            var temp = JSON.parse(fulfilled).rows[k];
            result.push({
                programId: temp.programid,
                programName:temp.programname,
                threshold:temp.rewardthreshold,
                paybackPoints: temp.paybackpoints,
                visitPoints:temp.visitpoints,
                cafes: temp.cafes
            });
        }
        res.contentType('application/json');
        res.send(JSON.stringify(result));
    }).catch(function(error){
        console.log(error);
    });
});


app.post('/updateProgramDetails', function(req, res) {
    utils.persistenceServiceCallWithParams(querystring.stringify({
        programid: req.body.programId,
        name: req.body.uprogramName,
        //cafes: req.body.ucafes,
        threshold: req.body.urewardThreshold,
        visitPoints: req.body.uvisitPoints,
        paybackPoints: req.body.upaybackPoints
    }),'/updateProgramDetails').then(function(fulfilled){
        res.writeHead(302,{
            'Location': '/manageRewards'
        });
        res.end();
    }).catch(function(error){
        console.log(error);
    });
});


app.get('/archiveProducts', function (req, res) {
    utils.persistenceServiceCallSansParams('/archiveProducts').then(function(fulfilled){
        var result = [];
        for(var k in JSON.parse(fulfilled).rows) {
            var temp = JSON.parse(fulfilled).rows[k];
            result.push({
                productid: temp.productid,
                productname:temp.productname,
                productdescription:temp.description,
                productsizeid: temp.productsizeid,
                productsize:temp.size,
                productprice:temp.price
            });
        }
        res.contentType('application/json');
        res.send(JSON.stringify(result));
    }).catch(function(error){
        console.log(error);
    });
});


app.get('/getProductToRestore', function(req, res) {
    console.log(req.query.id);

    utils.persistenceServiceCallWithParams(querystring.stringify({
        pId: req.query.id,
        pSizeId: req.query.sizeid
    }),'/restoreProduct').then(function(fulfilled){
        res.writeHead(302,{
            'Location': '/viewProduct'
        });
        res.end();
    }).catch(function(error){
        console.log(error);
    });
});


app.get('/archiveProgram', function(req, res) {
    console.log(req.query.id);

    utils.persistenceServiceCallWithParams(querystring.stringify({
        programId: req.query.programId
    }),'/archiveProgram').then(function(fulfilled){
        res.writeHead(302,{
            'Location': '/manageRewards'
        });
        res.end();
    }).catch(function(error){
        console.log(error);
    });
});


app.get('/archivedPrograms', function (req, res) {
    utils.persistenceServiceCallSansParams('/archivedPrograms').then(function(fulfilled){
        var result = [];
        for(var k in JSON.parse(fulfilled).rows) {
            var temp = JSON.parse(fulfilled).rows[k];
            result.push({
                programId: temp.programid,
                programName:temp.programname,
                threshold:temp.rewardthreshold,
                paybackPoints: temp.paybackpoints,
                visitPoints:temp.visitpoints,
                cafes: temp.cafes
            });
        }
        res.contentType('application/json');
        res.send(JSON.stringify(result));
    }).catch(function(error){
        console.log(error);
    });
});


app.get('/getProgramToRestore', function(req, res) {
    utils.persistenceServiceCallWithParams(querystring.stringify({
        programId: req.query.id
    }),'/programToRestore').then(function(fulfilled){
        res.writeHead(302,{
            'Location': '/manageRewards'
        });
        res.end();
    }).catch(function(error){
        console.log(error);
    });
});


app.post('/addAddOns', function(req, res) {
    utils.persistenceServiceCallWithParams(querystring.stringify({
        name: req.body.pNewName,
        type: req.body.pNewType,
        quantity: req.body.pNewQuantity,
        price: req.body.pNewPrice
    }),'/addAddOns').then(function(fulfilled){
        res.writeHead(302,{
            'Location': '/addOns'
        });
        res.end();
    }).catch(function(error){
        console.log(error);
    });
});


app.post('/getAddOnsList', function (req, res) {
    utils.persistenceServiceCallSansParams('/getAddOnsList').then(function(fulfilled){
        var result = [];
        for(var k in JSON.parse(fulfilled).rows) {
            var temp = JSON.parse(fulfilled).rows[k];
            result.push({
                addonid:temp.addonid,
                addonname:temp.name,
                addontype:temp.type,
                addonquantity:temp.quantity,
                addonprice:temp.price
            });
        }
        res.contentType('application/json');
        res.send(JSON.stringify(result));
    }).catch(function(error){
        console.log(error);
    });
});


app.get('/addOnToArchive', function(req, res) {
    console.log(req.query.id);

    utils.persistenceServiceCallWithParams(querystring.stringify({
        addOnId: req.query.id
    }),'/archiveAddOn').then(function(fulfilled){
        res.writeHead(302,{
            'Location': '/addOns'
        });
        res.end();
    }).catch(function(error){
        console.log(error);
    });
});


app.post('/UpdateAddOns', function(req, res) {
    utils.persistenceServiceCallWithParams(querystring.stringify({
        name: req.body.pUpdateName,
        type: req.body.pUpdateType,
        quantity: req.body.pUpdateQuantity,
        price: req.body.pUpdatePrice,
        addOnId: req.body.addOnId
    }),'/UpdateAddOns').then(function(fulfilled){
        res.writeHead(302,{
            'Location': '/addOns'
        });
        res.end();
    }).catch(function(error){
        console.log(error);
    });
});


app.get('/archivedAddOns', function (req, res) {
    utils.persistenceServiceCallSansParams('/archivedAddOns').then(function(fulfilled){
        var result = [];
        for(var k in JSON.parse(fulfilled).rows) {
            var temp = JSON.parse(fulfilled).rows[k];
            result.push({
                addOnId: temp.addonid,
                name:temp.name,
                type:temp.type,
                quantity: temp.quantity,
                price:temp.price
            });
        }
        res.contentType('application/json');
        res.send(JSON.stringify(result)).end();
    }).catch(function(error){
        console.log(error);
    });
});


app.get('/getAddOnToRestore', function(req, res) {
    utils.persistenceServiceCallWithParams(querystring.stringify({
        addOnId: req.query.id
    }),'/addOnToRestore').then(function(fulfilled){
        res.writeHead(302,{
            'Location': '/addOns'
        });
        res.end();
    }).catch(function(error){
        console.log(error);
    });
});

var server = app.listen(63342, function () {
    console.log('Node server is running..');
});
