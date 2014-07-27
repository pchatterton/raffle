var db = require('../models')
var passport = require('passport');
require('../config/passport')
var passport = require('passport-local').Strategy;

exports.createUser = function(req, res) {
//CHANGE TO USER FORM ADMIN EXAMPLE
  // var adminData = req.body;
  // var response = {
  //   result: false,
  //   message: '',
  //   user: null
  // };
  // db.Admin.count({ where: {username: adminData.username}}).success(function(c) {
  //   if(c > 0) {
  //     response.message = "Username is already taken."
  //   }
  //   else {
  //     db.Admin.create(adminData).success(function(user) {
  //     req.login(user, function(err) {
  //       if (err) { return next(err); }
  //         response.result = true;
  //         response.message = "You have successfully signed up in the raffle app."
  //       });
  //         response.user = user;
  //         res.send(response)
  //     })
  //   }
// })
}

exports.userLogin = function(req, res) {
	var response = {
    	loginStatus: false,
    	message: '',
    	userData: null
  	};
	db.User.find({ where: { id: req.body.userID }}).success(function(user) {
        if (!user) {
          response.message = "Invalid user id";
        } else if (req.body.eventID != user.EventID) {
          response.message = "Invalid event id"
        } else {
          response.loginStatus = true;
          response.message = "Success";
          response.userData = user;
        }
      	res.send(response)
      }).error(function(err){
        return done(err);
      })
      
}

exports.getUserPrizeData = function(req, res) {
  var response = {
      success: false,
      message: '',
      eventData: null
    };
    db.Prize.findAll({
      where: {eventID: req.params.evID}
    }).success(function(eventData) {
      response.success = true;
      response.message = "Successfully retrieved data";
      response.eventData = eventData;
      res.send(response)
    })
}

exports.getEventData = function(req, res) {
  var response = {
    success: false,
    message: '',
    eventData: null
  }
  db.Event.find({
    where: {id: req.params.evID}
  }).success(function(eventData) {
    response.success = true;
    response.message = "Successfully retrieved event data"
    response.eventData = eventData;
    res.send(response)
  })
}