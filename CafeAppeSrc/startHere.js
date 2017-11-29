var express = require('./node-postgres-todo/node_modules/express');
var constants = require('./CafeAppeClient/resources/mappings');

var app = express();

var bodyParser = require("./node-postgres-todo/node_modules/body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/addCafeSubmit', function (req, res) {
    var name = req.body.cafeName;

    res.send(name + ' Submitted Successfully!');
});

app.get('/', function (req, res) {
    res.sendFile(constants.PATH.ADMIN_PAGE_PATH);
});

app.get('/addCafe', function (req, res) {
    res.sendFile(constants.PATH.ADD_CAFE_PATH);
});

app.get('/viewCafe', function (req, res) {
    res.sendFile(constants.PATH.VIEW_CAFE_PATH);
});

var server = app.listen(5000, function () {
    console.log('Node server is running..');
});
