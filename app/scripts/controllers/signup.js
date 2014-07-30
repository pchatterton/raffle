'use strict';

var app = angular.module('rafflePrizeApp');

app.controller('SignupCtrl', function ($scope, Signup, $location, Authentication, $state, $rootScope) {

  var change = 'signup';
  $scope.$emit('updateMainBtn', change);

    var refreshForm = function() {
      $scope.newAdmin = {
        firstname: '',
        lastname: '',
        username: '',
        password: ''
      }
      $scope.pwRepeat = '';
    }

    refreshForm();

    $scope.createAdmin = function(admin_details) {
      Signup.createAdmin(admin_details).then(function(res) {
        if(res) {
          var setCookies = Authentication.adminCookiesSetup(res.user)
          if(setCookies) {
            refreshForm();
            $rootScope.loggedIn = true;
            $state.go('admin.event.summary')
          } else {
            $scope.formMessage = "There was an error. Please try again"
          }
        }
      })
    }

    $scope.validateUserName = function() {
      var username = $scope.newAdmin.username;
      Signup.validateUsername(username).then(function(res) {
        $scope.validateMsg = res.message;
        if(!res.result) {
          // invalidate this field
        }
      })
    }
});
