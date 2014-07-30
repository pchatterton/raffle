var db = require('../models')
var passport = require('passport');
require('../config/passport')
var passport = require('passport-local').Strategy;
var Sequelize  = require('sequelize');
var _ = require('underscore')._;


exports.getVotes = function(req, res) {
  db.Vote.findAll({ where: { userID: req.params.uID}}).success(function(votes) {
    console.log(votes)
        res.send(votes)
      }).error(function(err){
        return done(err);
      })
}

exports.submitUpdate = function(req, res) {
	console.log('submitupdate: ' + JSON.stringify(req.body))
	var prizeIDArr = [];
	var currentPrizeArr = [];
	var newPrizeArr = [];
	var prizeDataCurr = [];
	var prizeDataNew = [];
	var data = req.body;
	var voteNum = '';
	console.log(req.body)
	var create = true;

	for(var i=0; i<data.length; i++) {
		prizeIDArr.push(data[i].prizeID)
	}

	for(var i=0; i<data.length; i++) {
		db.Vote.find({ where: 
			Sequelize.and({userID: req.params.uID},
			{prizeID: data[i].prizeID})
		}).on('success', function(results) {
	  	if (results) { // if the record exists in the db
	  		currentPrizeArr.push(results.prizeID)
			for(var j=0; j<data.length; j++) {
	    		if(data[j].prizeID === results.prizeID) {
	    			voteNum = data[j].votes;
	    			data.splice(j,1)
	    		}
	    	}
   			results.updateAttributes({
      			votes: voteNum
   			}).success(function() {
   			});
	  	} else {
	  		newPrizeArr = _.difference(prizeIDArr, currentPrizeArr)
   			if(create) {
				create = false;
				for(var k=0; k<newPrizeArr.length; k++) {
					for(var l=0; l<data.length; l++) {
						if(newPrizeArr[k] === data[l].prizeID) {
							console.log('hi ' + data[l].prizeID)
							db.Vote.create({
								userID: req.params.uID,
								prizeID: data[l].prizeID,
								votes: data[l].votes
							})
								.success(function() {
								})
						}
					}
				}
   			}
	  	} 
		})
	}
	res.send({})
}