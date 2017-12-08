var connPool = require('../resources/postgresdb');
var constants = require('../resources/constants');

module.exports.addNewCafe = (name,createdby, modifiedby) => { return new Promise(
      function (resolve, reject) {
      connPool.query(
          constants.SQL.ADD_NEW_CAFE, [name,createdby, modifiedby],
          function(err, res ) {
              if(err) {
                reject(err);
              }
              else resolve();
          });
    }
);
};

module.exports.addNewAddress = (unitNumber, streetName, suburbId) => { return new Promise(
  function (resolve, reject) {
     connPool.query(
          constants.SQL.ADD_NEW_ADDRESS, [unitNumber, streetName, suburbId],function(err, res ) {
              if(err) {
                reject(err);
              }
              else resolve();
          });
    }
  );
};

module.exports.addNewLocation = ( longitude, latitude) => { return new Promise(
    function (resolve, reject) {
      connPool.query(
          constants.SQL.ADD_NEW_LOCATION, [longitude, latitude],function(err, res ) {
              if(err) {
                reject(err);
              }
              else resolve();
          });
    }
);
};

module.exports.getCafeList = () => {
  return new Promise(function (resolve, reject) {
      connPool.query(
          constants.SQL.GET_ALL_CAFES, function(err, res ) {
              if(err) {
                reject(err);
              }
              else{
                resolve(JSON.stringify(res));
              }
          });
    }
);
};
