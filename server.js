//server.js

// set up ======================================================================
// get needed server tools
var express  = require('express');
var app      = express();

var http       = require('http');
var Sequelize  = require('sequelize');
var passport   = require('passport');
var flash      = require('connect-flash');

var morgan        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
require('./server-assets/config/passport')

//Config Sequelize Database
var db = require('./server-assets/models');

// configuration ============================================================
db
  .sequelize
  .sync()
  .complete(function(err) {
    if (err) {
      throw err[0]
    } else {
      console.log('Express server listening on port 12000')
    }
  })
// set up Express application
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());
app.use(function(req, res, next) {
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Connection', 'close')
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next();
})

// required for passport
app.use(session({secret: 'acdc123456'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routes ======================================================================
var user = require('./server-assets/routes/user')

// launch ======================================================================
app.listen(12000);
console.log('The magic happens on port 12000');

// SIGNUP PAGE ROUTES
app.post('/signup.validate', user.validateUsername)
app.post('/signup.create', user.createAdmin)
// app.get('/admin.valid', user.isLoggedIn); Not using until I can figure it out

// LOGIN PAGE ROUTES
app.post('/login.admin', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
    if (err) {return next(err)}
    info.user = user;
    return res.send(info)
  })(req, res, next);
});
