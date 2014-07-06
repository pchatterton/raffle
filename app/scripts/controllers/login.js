'use strict';

var app = angular.module('rafflePrizeApp');

app.controller('LoginCtrl', function ($scope, $rootScope, AUTH_EVENTS, AuthService) {
    $scope.adminCreds = {
      username: '',
      password: ''
    };
    $scope.adminLogin = function (adminCreds) {
      debugger;
      console.log("adminLogin function");
      AuthService.login(adminCreds).then(function () {
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      }, function () {
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
    });
  };
});
