'use strict';

var app = angular.module('rafflePrizeApp');

app.controller('LoginCtrl', function ($scope, $location, $cookieStore, Login, Authentication) {

// code for Admin Login ========================================================

  $scope.loginSuccess = false;

  var refreshForm = function() {
    $scope.adminCreds = {
      username: '',
      password: ''
    }
  }

  refreshForm()

  var changeLoginSuccess = function(bol) {
    $scope.loginSuccess = true;
  }

  $scope.adminLogin = function(creds) {
    Login.loginAdmin(creds).then(function(res) {
      if(res.loginStatus) {
        refreshForm()
        var setCookies = Authentication.adminCookiesSetup(res.user)
        if(setCookies) {
          $location.path('admin/event')
        } else {
          $scope.adminFormMessage = "Error with creating sessions."
        }
      } else {
        $scope.adminFormMessage = res.message;
    }
    })

  }

});
