var os = require('os');
var express = require('express');
var constants = require('./CafeAppeClient/resources/mappings');


var querystring = require('querystring');
var http = require('http');


var app = express();

var bodyParser = require("./node-postgres-todo/node_modules/body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/addCafeSubmit', function(req, res) {
    /*req.username = req.body.cafeName;
    var name = req.body.cafeName;
    console.log(name);
    res.redirect(307, 'http://localhost:5000/addCafeSubmits'); */
    //res.send(name + ' Submitted Successfully!');
    var data = querystring.stringify({
        username: req.body.cafeName
    });

    var options = {
        host: 'localhost',
        port: 5000,
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

    res.sendFile(constants.PATH.PROJECT_PATH + constants.PATH.ADD_CAFE_PATH);
});

app.get('/viewCafe', function (req, res) {
    res.sendFile(constants.PATH.PROJECT_PATH + constants.PATH.VIEW_CAFE_PATH);
});

app.get('/cafeAdmin', function (req, res) {
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
