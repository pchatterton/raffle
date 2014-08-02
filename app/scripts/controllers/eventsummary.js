'use strict';

var app = angular.module('rafflePrizeApp');

app.controller('EventsummaryCtrl', function ($scope, $location, Event, Registrants) {

	$scope.enableEvent = function() {
		if($scope.myEvents.active === 0) {
			$scope.myEvents.active = 1;
			Event.updateStatus(1, $scope.myEvents.id)
		}
	}

	$scope.disableEvent = function() {
		if($scope.myEvents.active === 1) {
			$scope.myEvents.active = 0;
			Event.updateStatus(0, $scope.myEvents.id)
		}
	}

	var getCurrentRegistrant = function() {
		console.log('step1')
		Registrants.getCurrentRegistrants().then(function(res) {
		console.log('step3')
		console.log(res)
			if(res.success) {

				$scope.registrants = res.registrantData;
			}
		})
	}

	getCurrentRegistrant();
  });
