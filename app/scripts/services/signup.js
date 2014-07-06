'use strict';

var app = angular.module('rafflePrizeApp');

app.service('Signup', function Signup($http, $q) {

    this.validateUsername = function(username) {
      var deferred = $q.defer();
      $http({
          method: 'POST',
          url: 'http://localhost:12000/signup.validate',
          data: {
            username: username
          }
        }).success(function(res) {
            if(res.validate) {
              res.response = "Username works!";
            } else {
              res.response = "Sorry, username is already taken.";
            }
            deferred.resolve(res);
        })
      return deferred.promise;
    }

    this.createAdmin = function(admin) {
    var deferred = $q.defer();
    $http({
        method: 'POST',
        url: 'http://localhost:12000/signup.create',
        data: {
          firstName: admin.firstname,
          lastName: admin.lastname,
          username: admin.username,
          password: admin.password
        }
      }).success(function(data) {
            deferred.resolve(data);
      });
    return deferred.promise;
  }
  });

//append .error function
