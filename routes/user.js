var db = require('../models')

exports.createAdmin = function(req, res) {
  var adminData = req.body;
  db.Admin.create(adminData)
    .success(function(data) {
      res.send({});
    })
}

exports.validateUsername =  function(req, res) {
  var username = req.body;
  console.log("Validated: " + username.username)
  db.Admin.count({ where: username }).success(function(c) {
    console.log("C: " + c)
    if(c > 0) {
      res.send({validate: false})
    }
    else {
      res.send({validate: true})
    }
  })
}
