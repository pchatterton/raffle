'use strict';

var app = angular.module('rafflePrizeApp');

app.controller('userEventCtrl', function ($scope, userEvent, Authentication) {

	//Checks to see if prizes are available
	$scope.multPrizes = true;

	$scope.userID = userEvent.getUserID();
	$scope.saveBtn = true;

	$scope.logout = function() {
	    Authentication.logout();
	    $scope.loginBtnVis = false;
	    $scope.signupBtnVis = false;
  }

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
		$scope.prizes = data;
	}

	$scope.addVote = function(prizeData) {
		var res = userEvent.addVote(prizeData)
		if(res) {
			$scope.saveBtn = true;
			prizeData.votes++;
			remainingVotes();
		}
	}

	$scope.minusVote = function(prizeData) {
		if(prizeData.votes === 0) {
		} else {
			var res = userEvent.minusVote(prizeData)
			if(res) {
				$scope.saveBtn = true;
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
				$scope.saveBtn = false;		
			})
	}

	//run initial functions
	getEventData();
	getUserVotes();

  });
