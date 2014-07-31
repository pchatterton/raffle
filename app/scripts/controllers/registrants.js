'use strict';

var app = angular.module('rafflePrizeApp');

app.controller('RegistrantsCtrl', function ($scope, Registrants) {

	$scope.test = 'test'

	$scope.uploadEmails = function(text) {
		console.log('text: ' + text)
		Registrants.verifyText(text)
		var successRegistrants = Registrants.getRegistrants();
		var failedRegistrants = Registrants.getFailedUpload();

		console.log(successRegistrants)
		console.log(failedRegistrants)
	}
});
