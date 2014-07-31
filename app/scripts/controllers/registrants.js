'use strict';

var app = angular.module('rafflePrizeApp');

app.controller('RegistrantsCtrl', function ($scope, Registrants) {

	$scope.postUpload = false;

	$scope.uploadEmails = function(text) {
		if(text !== '') {
			console.log('text: ' + text)
			Registrants.verifyText(text);
			var successRegistrants = Registrants.getRegistrants();
			var failedRegistrants = Registrants.getFailedUpload();
			Registrants.postRegistrants().then(function(res) {
				$scope.postUpload = true;
				$scope.successEmails = successRegistrants;
				$scope.failedEmails = failedRegistrants;
			})
		}
	}
});
