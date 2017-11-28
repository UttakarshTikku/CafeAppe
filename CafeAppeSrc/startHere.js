var express = require('express');
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/addCafeSubmit', function (req, res) {
    var name = req.body.cafeName;

    res.send(name + ' Submitted Successfully!');
});

app.get('/', function (req, res) {
    res.sendFile('C:/Users/Uttakarsh/Desktop/CafeAppe/CafeAppeSrc/html/addCafe.html');
});

app.get('/addCafe', function (req, res) {
    res.sendFile('C:/Users/Uttakarsh/Desktop/CafeAppe/CafeAppeSrc/html/addCafe.html');
});

var server = app.listen(5000, function () {
    console.log('Node server is running..');
});
