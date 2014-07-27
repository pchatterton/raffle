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
var busboy = require('connect-busboy');
var multer = require('multer');

require('./server-assets/config/passport')

//Config Sequelize Database
var db = require('./server-assets/models');

// set up Express application
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(function(req, res, next) {
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Connection', 'close')
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next();
})
app.use(bodyParser());
// app.use(busboy());
app.use(multer({dest: './tmp_Img/',}));


// required for passport
app.use(session({secret: 'acdc123456'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// routes ======================================================================
var admin = require('./server-assets/routes/admin')
var event = require('./server-assets/routes/event')
var prize = require('./server-assets/routes/prize')
var user  = require('./server-assets/routes/user')
var vote = require('./server-assets/routes/vote')

// set table Associations
// db.Admin.hasMany(db.Event, {foreignKey: 'adminID'});
// db.Event.belongsTo(db.Admin, {foreignKey: 'id'})
// db.User.hasMany(db.Vote, {foreignKey: 'userID'})
// db.Prize.hasMany(db.Vote, {foreignKey: 'prizeID'})

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

// launch ======================================================================
app.listen(12000);
console.log('The magic happens on port 12000');

// SIGNUP PAGE ROUTES ===============================
app.post('/signup.validate', admin.validateUsername)
app.post('/signup.create', admin.createAdmin)
// app.get('/admin.valid', user.isLoggedIn); Not using until I can figure it out

// LOGIN PAGE ROUTES ================================
// ADMIN
app.post('/login.admin', function(req, res, next) {
  passport.authenticate('local-adminLogin', function(err, user, info) {
    if (err) {return next(err)}
    info.user = user;
    return res.send(info)
  })(req, res, next);
});

// USER
app.post('/login.user', user.userLogin)
app.get('/eventUser/:evID', user.getUserPrizeData)
app.get('/eventUser/data/:evID', user.getEventData)

// EVENT PAGE ROUTES ================================
app.get('/event/:evID', event.getEventInfo)
app.post('/event.create', event.createNewEvent)
app.post('/event/prize.create', prize.createNewPrize)
app.get('/event/prize/:evID', prize.getPrizeInfo)

// ADD OR REMOVE VOTES
app.get('/getVotes/:uID', vote.getVotes)
app.post('/eventUser.addVote', vote.addVote)
app.post('/eventUser.removeVote', vote.removeVote)