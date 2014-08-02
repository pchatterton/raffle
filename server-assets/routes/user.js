var db = require('../models')
var passport = require('passport');
require('../config/passport')
var passport = require('passport-local').Strategy;

exports.uploadRegistrants = function(req, res) {
  var emails = req.body.emails

  for(var i=0; i<emails.length; i++) {
    db.User.create({
      email: emails[i],
      EventID: req.params.evID,
      role: 'user'
    }).success(function(user) {
    })  
  }
  res.send({})
}

exports.getRegistrants = function(req, res) {
  console.log('getRegistrants function')
  var response = {
    success: false,
    message: '',
    registrantData: null
  };
  db.User.findAll({
    where: {eventID: req.params.evID}
  }).success(function(data) {
    response.success = true;
    response.message = "Successfully retrieved data";
    response.registrantData = data;
    console.log('data' + data)
    res.send(response)
  })
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