var dbConnection = require('../resources/postgresdb');
var constants = require('../resources/constants');

module.exports.addNewCafe = (name,createdby, modifiedby) => { return new Promise(
      function (resolve, reject) {
        console.log("5. Adding Cafe");
      dbConnection.query(
          constants.SQL.ADD_NEW_CAFE, [name,createdby, modifiedby],
          function(err, res ) {
              if(err) {
                console.log(err);
                reject(err);
              }
              else resolve();
          });
    }
);
};

module.exports.addNewAddress = (unitNumber, streetName, suburbId) => { return new Promise(
  function (resolve, reject) {
    console.log("4. Adding Address");
       dbConnection.query(
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
      console.log("3. Adding Location");
      dbConnection.query(
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
      console.log("9. about to hit database!");
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
};
