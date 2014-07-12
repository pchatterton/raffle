'use strict';

var app = angular.module('rafflePrizeApp');

app.controller('HeaderCtrl', function ($scope, $cookieStore, Authentication) {

    var refresh = function () {
      if($cookieStore.get('loggedIn') === true) {
        $scope.loggedIn = true;
    } else{
      $scope.loggedIn = false;
    }
  }

  refresh();

    $scope.logout = function() {
      Authentication.cookiesRemove();
    }

  });
