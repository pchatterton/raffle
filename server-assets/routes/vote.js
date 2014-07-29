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
										console.log('success new prizes')
									})
							}
						}
					}


   				}
   			});
	  	} 
		})
	}


	// db.Vote.findAll({ where: 
	// 	Sequelize.and({userID: req.params.uID},
	// 	{prizeID: prizeIDArr})
	// }).success(function(results) {
	// 	for(var i=0; i<results.length; i++) {
	// 		currentPrizeArr.push(results[i].prizeID)
	// 	}

	// 	newPrizeArr = _.difference(prizeIDArr, currentPrizeArr)



	// 	for(var i=0; i<newPrizeArr.length; i++) {
	// 		for(var j=0; j<data.length; j++) {
	// 			if(currentPrizeArr[i] === data[j].prizeID) {
	// 				var tempObj = {
	// 					prizeID: data[j].prizeID,
	// 					votes: data[j].votes
	// 				}
	// 				prizeDataNew.push(tempObj)
	// 			}
	// 		}
	// 	}

	// 	console.log('prizeDataCurr: ' + JSON.stringify(prizeDataCurr))

	// 	var prize = db.Prize.build({id: 1})
	// 	console.log('userID: ' + prize.id);
	// 	console.log('prizeID: ' + prize.prizeID);

		//update current Prizes
			// for(var j=0; j<prizeDataCurr.length; j++){
			// 	console.log('userId: ' + req.params.uID)
			// 	console.log('prizeid: ' + prizeDataCurr[i])
			// 	console.log('votes: ' + prizeDataCurr[i].votes)
			// 	db.Vote.update({
			// 		votes: prizeDataCurr[i].votes
			// 	},
			// 	{
			// 		userID: req.params.uID,
			// 		prizeID: prizeDataCurr[i].prizeID
			// 	})
			// 	.success(function() { 
			// 		console.log('itworked!')
			// 	 }).error(function(err) { 
			// 	     console.log("Project update failed !");
			// 	     //handle error here
			// 	 });
			// }

		// for(var i=0; i<newPrizeArr.length; i++) {
		// 	for(var j=0; j<prizeIDArr.length; j++) {
		// 		if(newPrizeArr[i] === prizeIDArr[j]) {
		// 			db.Vote.create({
		// 				userID: req.params.uID,
		// 				prizeID: prizeIDArr[j].prizeID,
		// 				votes: prizeIDArr[j].votes
		// 			})
		// 				.success(function() {
		// 					console.log('success new prizes')
		// 				})
		// 		}
		// 	}
		// }

		//create new Prizes
	// 	console.log(currentPrizeArr)

	// 	console.log(newPrizeArr) 
	// })
	// db.Prize.bulkCreate(req.body)
	// 	.success(function() {
	// 		db.Prize.update()
	// 	})
}