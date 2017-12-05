var dbConnection = require('../resources/postgresdb');
var constants = require('../resources/constants');

module.exports.getStates = new Promise(
    function (resolve, reject) {
      dbConnection.query(
          constants.SQL.GET_ALL_STATES, function(err, res ) {
              if(err) {
                reject(err);
              }
              else{
                resolve(JSON.stringify(res));
              }
          });
    }
);

module.exports.getSuburbs = (stateid) => { return new Promise(
    function (resolve, reject) {
      dbConnection.query(
          constants.SQL.GET_ALL_SUBURBS_FOR_STATE, [stateid], function(err, res ) {
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
