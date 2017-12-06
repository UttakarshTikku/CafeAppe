var http = require('http');

module.exports.persistenceServiceCallWithParams = (data, servicePath) => {
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
module.exports.persistenceServiceCallWithParamsAndResponse = (data, servicePath) => {
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
    var str = '';
    var httpreq = http.request(options, function (response) {
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
          str += chunk;
        });
        response.on('end', function (err) {
          if(err)
            reject(err);
          else
          resolve(str);
        });
      });
      httpreq.write(data);
      httpreq.end();
    });
};
module.exports.persistenceServiceCallSansParams = (servicePath) => {
  return new Promise( function(resolve, reject){
    var options = {
      host: 'localhost',
      port: 5001,
      path: servicePath,
      method: 'POST'
  };

  var str = '';
  var httpreq = http.request(options, function (response) {
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
    str += chunk;

  });
    response.on('end', function (err) {
      if(err)
        reject(err);
      else
      resolve(str);
    });
  });
  httpreq.end();
});
};
