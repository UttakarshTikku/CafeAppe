var dbConnection = require('../resources/postgresdb');
var constants = require('../resources/constants');

module.exports.addNewCafe = (cafeid,addressid,name,locationid,activeflag,createdby, modifiedby) => { return new Promise(
      function (resolve, reject) {
      console.log(addressid);
      dbConnection.query(
          constants.SQL.ADD_NEW_CAFE, [cafeid,addressid,name,locationid,activeflag,createdby, modifiedby],
          function(err, res ) {
              if(err) {
                console.log(err);
                reject(err);
              }
          });
    }
);
};

module.exports.addNewAddress = (addressId, unitNumber, streetName, suburbId) => { return new Promise(
  function (resolve, reject) {
       dbConnection.query(
          constants.SQL.ADD_NEW_ADDRESS, [addressId, unitNumber, streetName, suburbId],function(err, res ) {
              if(err) {
                reject(err);
              }
          });
    }
  );
};

module.exports.addNewLocation = (locId, longitude, latitude) => { return new Promise(
    function (resolve, reject) {
      console.log(locId);
      dbConnection.query(
          constants.SQL.ADD_NEW_LOCATION, [locId, longitude, latitude],function(err, res ) {
              if(err) {
                reject(err);
              }
          });
    }
);
};

module.exports.getCafeList = new Promise(
    function (resolve, reject) {
      dbConnection.query(
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
