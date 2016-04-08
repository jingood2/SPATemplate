'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var UserService = require('./user.service');

exports.index = index;
exports.show = show;
exports.create = create;
exports.update = update;
exports.destroy = destroy;
exports.changePassword = changePassword;
exports.me = me;
exports.authCallback = authCallback;


var validationError = function(res, err) {
  //return res.json(422, err);
  return res.status(422).json(err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
function index(req,res) {
  UserService
    .index()
    .then(function(users){
      res.json(users);
    })
    .catch(function(err){
      res.send(500,err);
    });
}

/*
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};
*/

/**
 * Creates a new user
 */
function create(req,res,next) {

  /*
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  */

  UserService
    .create(req.body)
    .then(function(user){
      var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
      res.json({ token: token, user: user });
    })
    .catch(function(err){
      if(err) return validationError(res,err);
    });

  /*
 UserService()
   .create(req.body)
   .then(function(err,user){

     var newUser = new User(req.body);

     newUser.provider = 'local';
     newUser.role = 'user';

   })
   .catch(function(err){

   });
   */
}

/*
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token, user: user });
  });
};
*/

/**
 * Get a single user
 */
function show(req,res,next) {
  UserService
    .show(req.param.id)
    .then(function(user){
      if(!user) return res.send(401);
      res.status(200).json(user.profile);
    })
    .catch(function(err){
      if(err) return next(err);
    });
}

/*
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};
*/

/**
 * Deletes a user
 * restriction: 'admin'
 */
function destroy(req,res) {
  UserService
    .destroy(req.param.id)
    .then(function(){
      return res.send(204);
    })
    .catch(function(err){
      if(err) return res.status(500).json(err);
    });
}
/*
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};
*/

/**
 * Change a users password
 */
function changePassword(req,res,next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  UserService
    .changePassword(userId,oldPass,newPass)
    .then(function(){
      res.send(200);
    })
    .catch(function(err){
      res.send(403);
    });
}

/*
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};
*/

/**
 * Get my info
 */
function me(req, res, next) {
  var userId = req.user._id;

  UserService
    .me(userId)
    .then(function(user){
      res.json(user);
    })
    .catch(function(err){
      if (err) return next(err);
      if (!user) return res.json(401);
    });

  /*
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
  */
};

/**
 * Authentication callback
 */
function authCallback(req, res, next) {
  res.redirect('/');
};
