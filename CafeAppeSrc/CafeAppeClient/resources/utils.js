var http = require('http');
module.exports.persistenceServiceCallWithParams = (data, servicePath) => {
  console.log(servicePath);
  return new Promise( function(resolve, reject){
    var options = {
        host: 'localhost',
        port: 5001,
        path: servicePath,
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
};
module.exports.persistenceServiceCallSansParams = (path) => {
  return new Promise( function(resolve, reject){
    var options = {
        host: 'localhost',
        port: 5001,
        path: path,
        method: 'POST'
    };

    var httpreq = http.request(options, function (response) {
        response.setEncoding('utf8');
        response.on('data', function (chunk) {});
      });
      httpreq.end(function(err, response){
        if(err)
          reject(err);
        else
          resolve();
      });

    });
};
