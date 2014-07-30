'use strict';

var app = angular.module('rafflePrizeApp', ['ngAnimate', 'ui.router', 'ngCookies', 'angularFileUpload', 'ui.utils']);

app.run(function($rootScope, $cookieStore){
	$rootScope.loggedIn = $cookieStore.get('loggedIn');
	$rootScope.userShow = $cookieStore.get('UserRole');
})