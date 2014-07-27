var db = require('../models')
var passport = require('passport');
require('../config/passport')
var passport = require('passport-local').Strategy;
var fs = require('fs')
var path = require('path')
// var busboy = require('connect-busboy');
var multer = require('multer');
var util = require('util');
// var mkdirp = require('mkdirp');

// =============================================================================
// Admin Prizes PAGE =================================================================
// =============================================================================

fs.mkdirParent = function(dirPath, mode, callback) {
//Call the standard fs.mkdir
fs.mkdir(dirPath, mode, function(error) {
  //When it fail in this way, do the custom steps
  if (error && error.errno === 34) {
    //Create all the parents recursively
    fs.mkdirParent(path.dirname(dirPath), mode, callback);
    //And then the directory
    fs.mkdirParent(dirPath, mode, callback);
  }
  //Manually run the callback since we used our own callback to do all these
  callback && callback(error);
});
};

var setFolderCodes = function(id) {
  var idLength = id.length;
  if(idLength >= 3) {
    return id
  } else if(idLength === 1) {
    return "00" + id
  } else if(idLength === 2) {
    return "0" + id
  }
}

exports.createNewPrize = function(req, res) {

    //Set admin and event ID vars used to save image to public directory
    var adminID = setFolderCodes(req.body.adminID);
    var eventID = setFolderCodes(req.body.eventID);

    //create folders in public directory if they don't exist
    fs.mkdirParent('public/' + adminID + '/' + eventID);

    //source: temp location where image is saved (tmp_Img folder)
    //target: new longterm location where image is saved (public folder)
    var source = req.files.file.path;
    var target = 'public/' + adminID + '/' + eventID + '/' + req.files.file.originalname;

    //Complete 'copy and paste' of source and target
    fs.writeFileSync(target, fs.readFileSync(source));

    var prizeName = req.body.prizeName;
    var prizeDescription = req.body.prizeDescription;
    var prizeUrl = "http://localhost:12000/" + adminID + '/' + eventID + '/' + req.files.file.originalname;
    var prizeStatus = req.body.prizeStatus;

    var prizeInfo = {
      prizeName: prizeName,
      prizeDescription: prizeDescription,
      prizeUrl: prizeUrl,
      status: prizeStatus,
      eventID: eventID
    }

    var response = {};
    db.Prize.create(prizeInfo).success(function(prizeData) {
      response.result = true;
      response.message = "Prize uploaded successfully..."
      response.prizeData = prizeData;
      res.send(response)
    })
};

exports.getPrizeInfo = function(req, res) {
  db.Prize.findAll({
    where: {eventID: req.params.evID}
  }).success(function(prizeInfo) {
    res.send(prizeInfo)
})
}
