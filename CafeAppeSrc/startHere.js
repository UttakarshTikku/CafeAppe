var url = require('url');
var express = require('./node-postgres-todo/node_modules/express');
var constants = require('./CafeAppeClient/resources/mappings');
var path = require('path');
var utils = require('./CafeAppeClient/resources/utils');

var querystring = require('querystring');



var app = express();

var bodyParser = require("./node-postgres-todo/node_modules/body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.sendFile(path.resolve(constants.PATH.PROJECT_PATH + constants.PATH.ADMIN_PAGE_PATH));
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
    res.writeHead(302, {
        'Location': '/viewCafe'
      });
      res.end();
    }).catch(function(error){ console.log(error); });
});

app.get('/viewCafe', function (req, res) {
    res.sendFile(path.resolve(constants.PATH.PROJECT_PATH + constants.PATH.VIEW_CAFE_PATH));
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
                    productname:temp.productname, productsize:temp.size,
                    productprice:temp.price, productsizeid:temp.productsizeid,
                    productdescription:temp.description});
            }
            res.contentType('application/json');
            res.send(JSON.stringify(result));
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
        res.writeHead(302,{
            'Location': '/viewProduct'
        });
        res.end();
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
        res.writeHead(302,{
            'Location': '/viewProduct'
        });
        res.end();
    }).catch(function(error){
        console.log(error);
    });
});


app.post('/createMenu', function(req, res) {
    console.log('In menu option');
    var dataToBeInserted = JSON.parse(req.body.menu);
    //console.log(dataToBeInserted);

    utils.persistenceServiceCallWithParams(querystring.stringify({
        cafeId: 1
    }),'/deleteMenu').then(function(fulfilled){
        for(var k in dataToBeInserted.rows){
            console.log(dataToBeInserted.rows[k]);
            utils.persistenceServiceCallWithParams(querystring.stringify({
                pName: dataToBeInserted.rows[k].productname,
                pDesc: dataToBeInserted.rows[k].productdescription,
                pSize: dataToBeInserted.rows[k].productsize,
                pPrice: dataToBeInserted.rows[k].productprice,
            }),'/createMenuSubmit').then(function(fulfilled1){
                //console.log(fulfilled1);
                res.writeHead(302,{
                    'Location': '/Menu'
                });
                res.end();
            }).catch(function(error){
                console.log(error);
            });
        }
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
            result.push({productname:temp.productname,
                productdescription:temp.productdescription,
                productsize:temp.productsize,
                productprice:temp.productprice
                });
        }
        res.contentType('application/json');
        res.send(JSON.stringify(result));
    }).catch(function(error){
        console.log(error);
    });
});

app.get('/getMenuList', function (req, res) {
    utils.persistenceServiceCallSansParams('/viewMenu').then(function(fulfilled){
        var result = [];
        console.log(fulfilled);
        for(var k in JSON.parse(fulfilled).rows) {
            var temp = JSON.parse(fulfilled).rows[k];
            result.push({productname:temp.productname,
                productdescription:temp.productdescription,
                productsize:temp.productsize,
                productprice:temp.productprice
            });
        }
        res.contentType('application/json');
        res.send(JSON.stringify(result));
    }).catch(function(error){
        console.log(error);
    });
});

var server = app.listen(63342, function () {
    console.log('Node server is running..');
});
