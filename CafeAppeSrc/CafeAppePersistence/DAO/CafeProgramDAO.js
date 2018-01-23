var connPool = require('../resources/postgresdb');
var constants = require('../resources/constants');

module.exports.createRewards = function (programname, rewardthreshold, visitpoints, paybackpoints) {
    return new Promise( function (resolve, reject) {
        connPool.query(
            constants.SQL.CREATE_REWARD, [rewardthreshold, visitpoints, paybackpoints, 1, new Date(), new Date(), 1, programname], function (err, res) {
                if (err) {
                    console.log(err);
                    throw reject(err);}
                else resolve(res);
            });
    })
};

module.exports.cafeProgram = function (cafes) {
    return new Promise( function (resolve, reject) {
        console.log("asdqhwd "+ cafes[0]);
        for (var id = 0;  id < cafes.length; id++){
            console.log(cafes[id]);
            loopCafeProgram(cafes[id], function (err, res) {
                if (err) throw reject(err);
                else resolve(res);
            });
        }
    })
};

function loopCafeProgram(cafeId) {
    return new Promise( function (resolve, reject) {
        connPool.query(
            constants.SQL.CAFE_PROGRAM, [cafeId, true], function (err, res) {
                if (err) {
                    console.log(err);
                    throw reject(err);}
                else resolve(res);
            });
    })
}

module.exports.getProgram = function() {
    return new Promise( function (resolve, reject) {
        connPool.query(
            constants.SQL.GET_PROGRAM, function (err, res) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
    });

}

module.exports.updateRewards = function (programid, programname, rewardthreshold, visitpoints, paybackpoints) {
    return new Promise( function (resolve, reject) {
        connPool.query(
            constants.SQL.UPDATE_PROGRAM_RULE, [programid, rewardthreshold, visitpoints, paybackpoints, new Date(), 1, programname], function (err, res) {
                if (err) {
                    console.log(err);
                    throw reject(err);}
                else resolve(res);
            });
    })
};

module.exports.updateCafeProgram = function (programid, cafes) {
    return new Promise( function (resolve, reject) {
        //console.log("asdqhwd "+ cafes[0]);
        for (var id = 0;  id < cafes.length; id++){
            console.log(cafes[id]);
            loopUpdateCafeProgram(programid, cafes[id], function (err, res) {
                if (err) throw reject(err);
                else resolve(res);
            });
        }
    })
};

function loopUpdateCafeProgram(programid, cafeId) {
    return new Promise( function (resolve, reject) {
        connPool.query(
            constants.SQL.UPDATE_CAFE_PROGRAM, [programid, cafeId, true], function (err, res) {
                if (err) {
                    console.log(err);
                    throw reject(err);}
                else resolve(res);
            });
    })
}


module.exports.archiveProgramRule = function (programId){

    //console.log(cafeId + pName + modifiedDateTime + modifiedBy);
    return new Promise(function (resolve, reject) {
        connPool.query(
            constants.SQL.ARCHIVE_PROGRAM_RULE, [programId], function(err, res ) {
                if(err) {
                    reject(err);
                }
                else resolve(res);
            });
    })};

module.exports.archiveCafeProgram = function (programId){

    return new Promise(function (resolve, reject) {
        connPool.query(
            constants.SQL.ARCHIVE_CAFE_PROGRAM, [programId], function(err, res ) {
                if(err) {
                    reject(err);
                }
                else resolve(res);
            });
    })};


module.exports.getArchivedPrograms = function() {
    return new Promise( function (resolve, reject) {
        connPool.query(
            constants.SQL.GET_ARCHIVE_PROGRAMS, function (err, res) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
    });

}

module.exports.restoreProgramRule = function (productId){

    //console.log(cafeId + pName + modifiedDateTime + modifiedBy);
    return new Promise(function (resolve, reject) {
        connPool.query(
            constants.SQL.RESTORE_PROGRAM_RULE, [productId], function(err, res ) {
                if(err) {
                    reject(err);
                }
                else resolve(res);
            });
    })};

module.exports.restoreCafeProgram = function (productId, productSizeId){

    return new Promise(function (resolve, reject) {
        connPool.query(
            constants.SQL.RESTORE_CAFE_PROGRAM, [productId], function(err, res ) {
                if(err) {
                    reject(err);
                }
                else resolve(res);
            });
    })};
