var db = require('../models')
var passport = require('passport');
require('../config/passport')
var passport = require('passport-local').Strategy;

// =============================================================================
// EVENT PAGE =================================================================
// =============================================================================

exports.getEventInfo = function(req, res) {
  db.Event.findAll({
    where: {adminID: req.params.evID}
  }).success(function(eventInfo) {
    res.send(eventInfo)
})
}

exports.createNewEvent = function(req, res) {
  var response = {
    result: false,
    message: '',
    eventData: null
  };
  db.Event.create(req.body).success(function(eventData) {
    response.result = true;
    response.message = "New event was successfully created."
    response.eventData = eventData;
    res.send(response);
  })
}
