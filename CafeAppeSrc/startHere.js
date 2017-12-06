var url = require('url');
var express = require('./node-postgres-todo/node_modules/express');
var constants = require('./CafeAppeClient/resources/mappings');


var querystring = require('querystring');
var http = require('http');


var app = express();

var bodyParser = require("./node-postgres-todo/node_modules/body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.sendFile(constants.PATH.PROJECT_PATH + constants.PATH.ADMIN_PAGE_PATH);
});

app.get('/addCafe', function (req, res) {

    res.sendFile(constants.PATH.PROJECT_PATH + constants.PATH.ADD_CAFE_PATH);
});

app.post('/addCafeSubmit', function (req, res) {
  console.log("1. add cafe submit");
  var dbPromise = new Promise( function(resolve, reject){
    var data = querystring.stringify({
        cafeName: req.body.cafeName,
        unitNumber: req.body.unitNumber,
        streetName: req.body.streetName,
        state: req.body.state,
        postcode: req.body.postcode,
        suburb: req.body.suburb
    });
    var options = {
        host: 'localhost',
        port: 5001,
        path: '/addNewCafe',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data)
        }
    };

    var httpreq = http.request(options, function (response) {
        response.setEncoding('utf8');
        response.on('data', function (chunk) {});
      });
      httpreq.write(data);
      httpreq.end(function(err, response){
        if(err)
          reject(err);
        else
          resolve();
      });

    });


  var promiseCall = function(){
    dbPromise.then(function(fulfilled){
      res.writeHead(302, {
        'Location': '/viewCafe'
      });
      res.end();
    }).catch(function(error){ })
  };
  promiseCall();
});

app.get('/viewCafe', function (req, res) {
    res.sendFile(constants.PATH.PROJECT_PATH + constants.PATH.VIEW_CAFE_PATH);
});

app.post('/getCafeList', function (req, res) {
  console.log("7. get cafe data!");
var dbPromise = new Promise( function(resolve, reject){
  var options = {
      host: 'localhost',
      port: 5001,
      path: '/getCafes',
      method: 'POST'
  };

var str = '';
  var httpreq = http.request(options, function (response) {
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
    str += chunk;

  });
    response.on('end', function () {
      resolve(str);
  });
});
  httpreq.end();
});


var promiseCall = function(){
  dbPromise.then(function(fulfilled){
    console.log("11. Returned back with the list of cafes");
    var result = [];
    for(var k in JSON.parse(fulfilled).rows) {
      var temp = JSON.parse(fulfilled).rows[k];
      result.push({cafeid:temp.cafeid,cafename:temp.cafename,address: temp.unitnumber+", "+temp.streetname+", "+temp.stateid});
    }
    res.contentType('application/json');
    console.log("12. Returing json of all cafes");
    res.send(JSON.stringify(result));
  }).catch(function(error){
  console.log(error);
  })
};
promiseCall();
});



app.post('/addProductSubmit', function(req, res) {
    var dbPromise = new Promise( function(resolve, reject) {
        var data = querystring.stringify({
            pName: req.body.pName,
            pDesc: req.body.pDesc,
            pSize: req.body.pSize,
            pPrice: req.body.pPrice
        });
        var str = '';
        var options = {
            host: 'localhost',
            port: 5001,
            path: '/addProductSubmits',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(data)
            }
        };
        var httpreq = http.request(options, function (response) {
            response.setEncoding('utf8');
            response.on('data', function (chunk) {
                resolve(str);
            });

        });
        httpreq.write(data);
        httpreq.end();
    });
    var productPromiseCall = function(){
        dbPromise.then(function(fulfilled){
            res.writeHead(302,{
             'Location': '/viewProduct'
            });
            res.end();
        }).catch(function(error){
            console.log(error);
        })
    };
    productPromiseCall();
});



app.post('/getProductList', function (req, res) {
    console.log('Ina asd');
    var dbPromise = new Promise( function(resolve, reject){
        var options = {
            host: 'localhost',
            port: 5001,
            path: '/getProductsList',
            method: 'POST'
        };

        var str = '';
        var httpreq = http.request(options, function (response) {
            response.setEncoding('utf8');
            response.on('data', function (chunk) {
                str += chunk;

            });
            response.on('end', function () {
                //console.log(str);
                resolve(str);
            });
        });
        httpreq.end();
    });


    var promiseCall = function(){
        dbPromise.then(function(fulfilled){
            var result = [];
            for(var k in JSON.parse(fulfilled).rows) {
                var temp = JSON.parse(fulfilled).rows[k];
                result.push({productid:temp.productid, productname:temp.productname, productsize:temp.productsizeid, productprice:temp.price});
            }
            res.contentType('application/json');
            res.send(JSON.stringify(result));
        }).catch(function(error){
            console.log(error);
        })
    };
    promiseCall();
});


app.post('/getStatesList', function (req, res) {
var dbPromise = new Promise( function(resolve, reject){
  var options = {
      host: 'localhost',
      port: 5001,
      path: '/getStates',
      method: 'POST'
  };

var str = '';
  var httpreq = http.request(options, function (response) {
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
    str += chunk;

  });
    response.on('end', function () {
      resolve(str);
  });
});
  httpreq.end();
});


var promiseCall = function(){
  dbPromise.then(function(fulfilled){
    var result = [];
    for(var k in JSON.parse(fulfilled).rows) {
      var temp = JSON.parse(fulfilled).rows[k];
      result.push({id:temp.stateid,text:temp.statename});
    }
    res.contentType('application/json');
    res.send(JSON.stringify(result));
  }).catch(function(error){
  console.log(error);
  })
};
promiseCall();
});

app.post('/getSuburbList', function (req, res) {
  var data = querystring.stringify({
      stateId: req.query.stateId
  });
var dbPromise = new Promise( function(resolve, reject){
  var options = {
      host: 'localhost',
      port: 5001,
      path: '/getSuburbs',
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(data)
      }
  };

var str = '';
  var httpreq = http.request(options, function (response) {
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
    str += chunk;

  });
    response.on('end', function () {
      resolve(str);
  });
});
  httpreq.write(data);
  httpreq.end();
});


var promiseCall = function(){
  dbPromise.then(function(fulfilled){
    var result = [];
    for(var k in JSON.parse(fulfilled).rows) {
      var temp = JSON.parse(fulfilled).rows[k];
      result.push({id:temp.suburbid,text:temp.suburbname});
    }
    res.contentType('application/json');
    res.send(JSON.stringify(result));
  }).catch(function(error){
  console.log(error);
  })
};
promiseCall();
});

app.get('/cafeAdmin', function (req, res) {
    console.log(req.query.cafeId);
    res.sendFile(constants.PATH.PROJECT_PATH + constants.PATH.CAFE_ADMIN_PATH);
});

app.get('/viewProduct', function (req, res) {
    res.sendFile(constants.PATH.PROJECT_PATH + constants.PATH.VIEW_PRODUCT_PATH);
});

app.get('/archivedCafe', function (req, res) {
    res.sendFile(constants.PATH.PROJECT_PATH + constants.PATH.VIEW_ARCHIVED_CAFES);
});

app.get('/addProduct', function (req, res) {
    res.sendFile(constants.PATH.PROJECT_PATH + constants.PATH.ADD_PRODUCT_PATH);
});

var server = app.listen(63342, function () {
    console.log('Node server is running..');
});
