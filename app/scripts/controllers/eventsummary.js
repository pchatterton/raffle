'use strict';

var app = angular.module('rafflePrizeApp');

app.controller('EventsummaryCtrl', function ($scope, $location, Event) {

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
  });
