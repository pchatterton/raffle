'use strict';

var app = angular.module('rafflePrizeApp');

app.controller('LoginCtrl', function ($scope, $location, $cookieStore, Login, Authentication, $state, $rootScope) {

// code for Admin Login ========================================================

  $scope.loginSuccess = false;

  var change = 'login';
  $scope.$emit('updateMainBtn', change);

  var refreshAdminForm = function() {
    $scope.adminCreds = {
      username: '',
      password: ''
    }
  }

  var refreshUserForm = function() {
    $scope.userCreds = {
      username: '',
      password: ''
    }
  }

  refreshAdminForm()
  refreshUserForm()

  var changeLoginSuccess = function(bol) {
    $scope.loginSuccess = true;
  }

  $scope.adminLogin = function(creds) {
    // console.log('res: ' + typeof creds)
    // if(!creds) {
    //   console.log('!creds')
    //   $scope.adminFormMessage = "Include username and password."
    //   return;
    // }
    Login.loginAdmin(creds).then(function(res) {
      if(res.loginStatus) {
        var setCookies = Authentication.adminCookiesSetup(res.user)
        if(setCookies) {
          refreshAdminForm()
          $rootScope.loggedIn = true;
          $state.go('admin.event.summary')
        } else {
          $scope.adminFormMessage = "Error with creating sessions."
        }
      } else {
        $scope.adminFormMessage = res.message;
    }
    })

  }

  $scope.userLogin = function(creds) {
    Login.loginUser(creds).then(function(res) {
      if(res.loginStatus) {
        refreshUserForm()
        var setCookies = Authentication.userCookiesSetup(res.userData)
        if(setCookies) {
          $rootScope.loggedIn = true;
          $rootScope.userShow = true;
          $location.path('userEvent')
        } else {
          $scope.adminFormMessage = "Error with creating sessions."
        }
      } else {
        console.log('no good')
        $scope.userFormMessage = res.message;
    }
    })

  }


});
