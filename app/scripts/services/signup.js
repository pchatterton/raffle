'use strict';

var app = angular.module('rafflePrizeApp');

app.service('Signup', function Signup($http, $q, Authentication) {

    this.validateUsername = function(username) {
      var deferred = $q.defer();
      $http({
          method: 'POST',
          url: 'http://localhost:12000/signup.validate',
          data: {
            username: username
          }
        }).success(function(res) {
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
      }).success(function(res) {
        console.log(res)
            deferred.resolve(res);
      });
    return deferred.promise;
  }
  });
