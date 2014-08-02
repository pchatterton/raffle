'use strict';

var app = angular.module('rafflePrizeApp');

app.controller('RegistrantsCtrl', function ($scope, Registrants) {

	$scope.postUpload = false;
	$scope.uploadRegistrantsView = false;
	$scope.showCancel = true;

	var getCurrentRegistrant = function() {
		Registrants.getCurrentRegistrants().then(function(res) {
			if(res.success) {
				$scope.currentRegistrants = res.registrantData;
			}
		})
	}

	getCurrentRegistrant();

	$scope.uploadEmails = function(text) {
		if(text !== '') {
			Registrants.verifyText(text);
			var successRegistrants = Registrants.getRegistrants();
			var failedRegistrants = Registrants.getFailedUpload();
			Registrants.postRegistrants().then(function(res) {
				$scope.postUpload = true;
				$scope.successEmails = successRegistrants;
				$scope.failedEmails = failedRegistrants;
				$scope.showCancel = false;
			})
		}
	}

	$scope.showUploadBtn = function() {
		$scope.uploadRegistrantsView = true;
	}

	$scope.finishRegistrantUpload = function() {
		$scope.uploadRegistrantsView = false;
	}

	

	
});
