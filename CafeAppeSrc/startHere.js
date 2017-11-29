var express = require('express');
var constants = require('./CafeAppeClient/resources/mappings');

var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/addCafeSubmit', function (req, res) {
    var name = req.body.cafeName;

    res.send(name + ' Submitted Successfully!');
});

app.get('/', function (req, res) {
    res.sendFile(constants.ADMIN_PAGE_PATH);
});

app.get('/addCafe', function (req, res) {
    res.sendFile(constants.ADD_CAFE_PATH);
});

app.get('/viewCafe', function (req, res) {
    res.sendFile(constants.VIEW_CAFE_PATH);
});

app.get('/cafeAdmin', function (req, res) {
    res.sendFile(constants.CAFE_ADMIN_PATH);
});

app.get('/addProduct', function (req, res) {
    res.sendFile(constants.ADD_PRODUCT_PATH);
});

app.get('/viewProduct', function (req, res) {
    res.sendFile(constants.VIEW_PRODUCT_PATH);
});

app.get('/archivedCafe', function (req, res) {
    res.sendFile(constants.VIEW_ARCHIVED_CAFES);
});

var server = app.listen(5000, function () {
    console.log('Node server is running..');
});
