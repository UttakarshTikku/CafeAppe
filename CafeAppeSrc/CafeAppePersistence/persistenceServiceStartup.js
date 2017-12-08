var express = require('../node-postgres-todo/node_modules/express');

var constants = require('./resources/constants');
 var productDAO = require('./DAO/ProductDAO');
 var cafeDAO = require('./DAO/CafeDAO');
 var generalDAO = require('./DAO/GeneralDAO');

var app = express();
var bodyParser = require("../node-postgres-todo/node_modules/body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

/*app.get('/getAllProducts', function (req, res) {
  console.log(productDAO.viewProduct());
});*/

app.post('/getCafes', function (req, res){
    cafeDAO.getCafeList().then(function(fulfilled){
      return res.send(fulfilled);
    }).catch(function (error) {
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

app.post('/getSuburbs', function (req, res){
      generalDAO.getSuburbs(req.body.stateId).then(function(fulfilled){
      return res.send(fulfilled);
    }).catch(function (error) {
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


app.post('/addProductSubmits', function (req, res){
    console.log(req.body.pName);
    console.log(req.body.pName + req.body.pDesc + req.body.pPrice + req.body.pSize);
    var a = function() {
        productDAO.createProductPromise(1, req.body.pName, true, 1, new Date(), new Date(), 1)
            .then(function (fulfilled) {
                //return res.send(fulfilled);
            }).then(productDAO.createProductSizePromise(1,1, req.body.pPrice , 1.12, true, 1, new Date(), new Date(), 1).then(
            function (fulfilled) {
                return res.send(fulfilled);
            }).catch(function (error) {
            console.log(error);
        }))
            .catch(function (error) {
                console.log(error);
            });
    }
    return a();
});


app.post('/getProductsList', function (req, res){
    console.log('inb');
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
    console.log('inb sdewefew');
    var a = function(){
        productDAO.getProduct(req.body.id).then(function(fulfilled){
            //console.log(fulfilled);
            return res.send(fulfilled);
        }).catch(function (error) {
            console.log(error);
        });
    }
    return a();
});


app.post('/updateProductSubmits', function (req, res){
    console.log(req.body.pName);
    console.log(req.body.pName + req.body.pDesc + req.body.pPrice + req.body.pSize);
    var a = function() {
        productDAO.updateProductPromise(req.body.pId, req.body.pName, new Date(), 1)
            .then(function (fulfilled) {
                console.log(fulfilled);
                return res.send(fulfilled);
            })/*.then(productDAO.updateProductSizePromise(req.body.productid,1, req.body.pPrice , new Date(), 1).then(
            function (fulfilled) {
                return res.send(fulfilled);
            })*/.catch(function (error) {
            console.log(error);
        })
            .catch(function (error) {
                console.log(error);
            });
    }
    return a();
});

var server = app.listen(5001, function () {
    console.log('Node server is running..');
});
