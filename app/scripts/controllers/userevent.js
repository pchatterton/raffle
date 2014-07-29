'use strict';

var app = angular.module('rafflePrizeApp');

app.controller('userEventCtrl', function ($scope, userEvent) {

	//Checks to see if prizes are available
	$scope.multPrizes = true;

	//Retrieves the Prize data based off the event ID
	var getEventData = function() {
		userEvent.eventPrizeRequest()
			.then(function(data){
				if(data.length === 0) {
					$scope.multPrizes = false;
				}
				getVoteData(setEventData);
			})
	}

	//Retrieves the UserVotes 
	var getUserVotes = function() {

		userEvent.getUserVotes()
			.then(function(votes) {
				eventInfo();
			})

	}

	//Function runs if getEventData function is successful
	//Retreives the votedata
	var getVoteData = function(cb) {
		var eventData = userEvent.getAllData()
		cb(eventData)
	}

	var setEventData = function(data) {
		console.log('setEventData: '+ JSON.stringify(data))
		$scope.prizes = data;
	}

	$scope.addVote = function(prizeData) {
		var res = userEvent.addVote(prizeData)
		if(res) {
			prizeData.votes++;
			remainingVotes();
		}
	}

	$scope.minusVote = function(prizeData) {
		if(prizeData.votes === 0) {
			console.log('its zero!')
		} else {
			var res = userEvent.minusVote(prizeData)
			if(res) {
				prizeData.votes--;
				remainingVotes();
			}
		}
	}

	var eventInfo = function() {
	userEvent.getEventInfo()
		.then(function(data){
			$scope.eventInfo = data.eventData;
			remainingVotes();
		})
	}

	var remainingVotes = function() {
		$scope.remVotes = userEvent.votesRemaining();
	}

	$scope.submitUpdates = function() {
		userEvent.submitUpdates()
			.then(function(data) {
				console.log('submit update worked!')
			})
	}

	//run initial functions
	getEventData();
	getUserVotes();

  });
