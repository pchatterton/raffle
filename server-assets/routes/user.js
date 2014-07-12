var db = require('../models')
var passport = require('passport');
require('../config/passport')
var passport = require('passport-local').Strategy;

// =============================================================================
// SIGNUP PAGE =================================================================
// =============================================================================

exports.validateUsername =  function(req, res) {
  var username = req.body;
  var response = {
    result: false,
    message: ''
  };
  db.Admin.count({ where: username}).success(function(c) {
    if(c > 0) {
      response.message = "Sorry, username is already taken";
    }
    else {
      response.result = true;
      response.message = "Username works!"
    }
    res.send(response)
  })
}

exports.createAdmin = function(req, res) {
  var adminData = req.body;
  var response = {
    result: false,
    message: '',
    user: null
  };
  db.Admin.count({ where: {username: adminData.username}}).success(function(c) {
    if(c > 0) {
      response.message = "Username is already taken."
    }
    else {
      db.Admin.create(adminData).success(function(user) {
      req.login(user, function(err) {
        if (err) { return next(err); }
          response.result = true;
          response.message = "You have successfully signed up in the raffle app."
        });
          response.user = user;
          res.send(response)
      })
    }
})}



// =============================================================================
// LOGIN PAGE =================================================================
// =============================================================================

exports.adminLogin = function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
      if (err) {
        console.log("we got an error with login")
        return next(err)
      }
      if (!user) {
      console.log("not a user")
      console.log("info: " + JSON.stringify(info, null, 4))
    } else {
      console.log("req.isAuthenticated: " + req.isAuthenticated())
      console.log('got user');
      console.log("user: " + user)
    }
      return res.send(user)
    })(req, res, next);
    //req.login logs in user?
}

// exports.getAdmin = function(req, res) {
//   console.log('access granted admin!');
//   res.send({
//       user : req.user // get the user out of session and pass to template
//     });
// };

// NOT USING UNTIL I CAN FIGURE IT OUT
// exports.isLoggedIn = function(req, res, next) {
//   console.log("Calling: isLoggedIn.....")
//   console.log("user: " + req.user)
//   console.log("isAuthenticated: " + req.isAuthenticated())
//   var response = {
//     authenticated: true
//   }
//   if(req.isAuthenticated()) {
//     return res.end(response)
//   }
//   else {
//     response.authenticated = false;
//     return res.send(response)
//   }
// }

// Admin logins into the application
// exports.postlogin = function(req, res, next) {
//   console.log("postLogin");
//   passport.authenticate('local', function(err, user, info) {
//     if (err) { return next(err) }
//     if (!user) {
//       req.session.messages =  [info.message];
//       res.send({})
//       console.log("not a user")
//     }
//     req.logIn(user, function(err) {
//       if (err) { return next(err); }
//       console.log("is a user")
//       console.log("User: " + JSON.stringify(user, null, 4))
//       res.send(user)
//     });
//   })(req, res, next);
// };

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};
