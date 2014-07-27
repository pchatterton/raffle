var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var db = require('../models')
var user = require('../routes/user')
var session = require('express-session');

// Serialize sessions
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.Admin.find({where: {id: id}}).success(function(user){
    done(null, user);
  }).error(function(err){
    done(err, null);
  });
});

// Use local strategy to create user account
passport.use('local-signup', new LocalStrategy(
  function(username, password, done) {
    console.log('local-signup')
    process.nextTick(function() {
      db.Admin.find({ where: {username: username}}).success(function(user) {
        return done(null, user);
      })
    })
  }
));
  passport.use('local-adminLogin', new LocalStrategy(
  function(username, password, done) {
    process.nextTick(function() {
      db.Admin.find({ where: { username: username }}).success(function(user) {
        if (!user) {
          return done(null, false, {loginStatus: false, message: 'Username is unknown'});
        } else if (password != user.password) {
          return done(null, false, {loginStatus: false, message: 'Password is invalid'});
        } else {
          return done(null, user, {loginStatus: true, message: 'Success!'});
        }
      }).error(function(err){
        return done(err);
      })
    });
  }
));
