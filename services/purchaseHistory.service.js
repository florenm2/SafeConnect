var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('purchaseHistory');

var service = {};

service.getById = getById;
service.getByUsername = getByUsername;

module.exports = service;

function getById(_id) {
    var deferred = Q.defer();

    db.purchaseHistory.findById(_id, function (err, ph) {
        if (err) deferred.reject(err);

        if (ph) {
            // return user (without hashed password)
            deferred.resolve();
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getByUsername(username) {
    
    var deferred = Q.defer();
 
    db.purchaseHistory.find({username : username} , function (err, ph) {
        if (err) deferred.reject(err);

        if (ph) {
            // return user (without hashed password)
            deferred.resolve();
        } else {
            
        }
    });

    return deferred.promise;
}
