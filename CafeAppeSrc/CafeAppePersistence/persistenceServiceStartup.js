var express = require('express');

var constants = require('./resources/constants');
 var productDAO = require('./DAO/productDAO');

var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/getAllProducts', function (req, res) {
  console.log("Hello World!")
  console.log(productDAO.viewProduct());
});

var server = app.listen(5001, function () {
    console.log('Node server is running..');
});
