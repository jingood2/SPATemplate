'use strict';

var _ = require('lodash');
var Q = require('q');
var User = require('./user.model');

exports.index = index;
exports.show = show;
exports.create = create;
exports.update = update;
exports.destroy = destroy;
exports.changePassword = changePassword;
exports.me = me;


// Get list of user
function index() {
  var deferred = Q.defer();

  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return deferred.reject(err);
     deferred.resolve(users);
  });
  return deferred.promise;
};

// Get a single user
function show(id) {
  var deferred = Q.defer();

  User.findById(id, function (err, user) {
    if(err) return deferred.reject(err);
    if (!user) return deferred.reject(
      Error.new({
        code: 'NOT_FOUND',
        message: 'User: ' + id + ' is not found.'
      })
    );
    deferred.resolve(user);
  });
  return deferred.promise;
};

// Creates a new user in the DB.
function create(params) {
  var deferred = Q.defer();
  var newUser = new User(params);

  newUser.provider = 'local';
  newUser.role = 'user';

  User.create(newUser, function (err, user) {
    if(err) return deferred.reject(err);
    deferred.resolve(user);
  });
  return deferred.promise;
};

// Updates an existing user in the DB.
function update(id, params) {
  var deferred = Q.defer();

  User.findById(id, function (err, user) {
    if(err) return deferred.reject(err);
    if (!user) return deferred.reject(
      Error.new({
        code: 'NOT_FOUND',
        message: 'User: ' + id + ' is not found.'
      })
    );

    var updated = _.merge(user, params);
    updated.save(function (err) {
      if (err) { return deferred.reject(err); }
      return deferred.resolve(user);
    });
  });
  return deferred.promise;
};

// Deletes a user from the DB.
function destroy(id) {
  var deferred = Q.defer();

  User.findById(id, function (err, user) {
    if(err) return deferred.reject(err);
    if (!user) return deferred.reject(
      Error.new({
        code: 'NOT_FOUND',
        message: 'User: ' + id + ' is not found.'
      })
    );

    user.remove(function(err) {
      if(err) { return deferred.reject(err); }
      return deferred.resolve(204);
    });

  });
  return deferred.promise;
};

function changePassword(id,oldPass,newPass) {
  var deferred = Q.defer();

  User.findById(id, function (err, user) {
    if(err) return deferred.reject(err);
    if (!user) return deferred.reject(
      Error.new({
        code: 'NOT_FOUND',
        message: 'User: ' + id + ' is not found.'
      })
    );

    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return deferred.reject(err);
        return deferred.resolve();
      });
    } else {
      return deferred.reject(err);
    }
  });
};

function me(id) {
  var deferred = Q.defer();

  User.findOne({
    _id: id
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return deferred.reject(err);
    if (!user) return deferred.reject(
      Error.new({
        code: 'NOT_FOUND',
        message: 'User: ' + id + ' is not found.'
      })
    );

    deferred.resolve(user);
  });
}
