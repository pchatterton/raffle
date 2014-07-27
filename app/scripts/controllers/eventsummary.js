'use strict';

var app = angular.module('rafflePrizeApp');

app.controller('EventsummaryCtrl', function ($scope, $location, Event) {

	$scope.enableEvent = function() {
		console.log('enable')
		$scope.myEvents.active = 1;
		//update to server
	}

	$scope.disableEvent = function() {
		console.log('disable')
		$scope.myEvents.active = 0;
		//update to server
	}


  });
