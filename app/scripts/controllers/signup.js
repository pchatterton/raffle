'use strict';

var app = angular.module('rafflePrizeApp');

app.controller('SignupCtrl', function ($scope, Signup) {

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
      Signup.createAdmin(admin_details).then(function() {
        refreshForm();
      })
    }

    $scope.validateUserName = function() {
      var username = $scope.newAdmin.username;
      Signup.validateUsername(username).then(function(res) {
        $scope.validateMsg = res.response
      })
    }
});
