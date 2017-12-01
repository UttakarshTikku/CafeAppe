var url = require('url');
var express = require('./node-postgres-todo/node_modules/express');
var constants = require('./CafeAppeClient/resources/mappings');


var querystring = require('querystring');
var http = require('http');


var app = express();

var bodyParser = require("./node-postgres-todo/node_modules/body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.post('/addCafeSubmit', function(req, res) {
    var data = querystring.stringify({
        username: req.body.cafeName
    });
    var options = {
        host: 'localhost',
        port: 5001,
        path: '/addCafeSubmits',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data)
        }
    };
    var httpreq = http.request(options, function (response) {
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            console.log("body: " + chunk);
        });

    });
    httpreq.write(data);
    httpreq.end();
});

app.get('/', function (req, res) {

  console.log(os.platform());
    res.sendFile(constants.PATH.PROJECT_PATH + constants.PATH.ADMIN_PAGE_PATH);
});

app.get('/addCafe', function (req, res) {

    console.log('dsa');
    console.log(constants.PATH.PROJECT_PATH);
    console.log(constants.PATH.PROJECT_PATH + constants.PATH.ADD_CAFE_PATH);
    res.sendFile(constants.PATH.PROJECT_PATH + constants.PATH.ADD_CAFE_PATH);
});

app.get('/viewCafe', function (req, res) {
    res.sendFile(constants.PATH.PROJECT_PATH + constants.PATH.VIEW_CAFE_PATH);
});

app.post('/getCafeList', function (req, res) {
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
    var result = [];
    for(var k in JSON.parse(fulfilled).rows) {
      var temp = JSON.parse(fulfilled).rows[k];
      result.push({id:temp.stateid,name:temp.statename});
    }
    res.contentType('application/json');
    res.send(JSON.stringify(result));
  }).catch(function(error){
  console.log(error);
  })
};
promiseCall();
});



app.post('/addProductSubmit', function(req, res) {
    var data = querystring.stringify({
        pName: req.body.pName,
        pDesc: req.body.pDesc,
        pSize: req.body.pSize,
        pPrice: req.body.pPrice
    });
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
            console.log("body: " + chunk);
        });

    });
    httpreq.write(data);
    httpreq.end();
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
