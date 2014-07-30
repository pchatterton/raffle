'use strict';

var app = angular.module('rafflePrizeApp');

app.controller('RegistrantsCtrl', function ($scope) {

	$scope.test = 'test'

	$scope.uploadEmails = function(text) {
		console.log('text: ' + text)
	}
});
