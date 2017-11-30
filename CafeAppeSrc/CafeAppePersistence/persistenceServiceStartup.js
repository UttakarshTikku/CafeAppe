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

app.post('/getCafes', function (req, res){
  var a = function(){
      productDAO.getStates.then(function(fulfilled){
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
