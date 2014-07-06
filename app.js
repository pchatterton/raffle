var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var user = require('./routes/user');
var db = require('./models');

var app = express();
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
app.listen(12000);


app.post('/signup.create', user.createAdmin)
app.post('/signup.validate', user.validateUsername)
app.post('/login.admin', user.adminLogin)


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

//Does this work>//

// var Testtable = db.define('Testtable', {
//   firstName: Sequelize.STRING,
//   lastName: Sequelize.STRING,
//   username: Sequelize.STRING,
//   password: Sequelize.STRING,
//   role: Sequelize.STRING,
// });
// db.sync();
//
// app.get('/', function(req, res) {
//   db.all().success(function(lawyers) {
//     res.send(JSON.stringify(lawyers));
//   })
// })
//
// app.post('/', function(req, res) {
//   db.create({firstName: "Paul2", lastName: "Chatty2", username: "test2", password: "pw2", role: "admin2"})
//     .success(function() {
//       console.log("it works!")
//     })
// })
