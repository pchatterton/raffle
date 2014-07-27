var db = require('../models')
var passport = require('passport');
require('../config/passport')
var passport = require('passport-local').Strategy;


exports.getVotes = function(req, res) {
  db.Vote.findAll({ where: { userID: req.params.uID}}).success(function(votes) {
    console.log(votes)
        res.send(votes)
      }).error(function(err){
        return done(err);
      })
}

exports.addVote = function(req, res) {


}

exports.removeVote = function(req, res) {


}