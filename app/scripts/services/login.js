'use strict';

var app = angular.module('rafflePrizeApp');

app.service('Login', function Login($http, $q, Authentication) {

    this.loginAdmin = function(creds) {
      var deferred = $q.defer();
      $http({
          method: 'POST',
          url: 'http://localhost:12000/login.admin',
          data: {
            username: creds.username,
            password: creds.password
          }
        }).success(function(res) {
              deferred.resolve(res);
            }).
              error(function(res) {
                deferred.resolve
            });
            return deferred.promise
        }

    this.loginUser = function(creds) {
      var deferred = $q.defer();
      $http({
          method: 'POST',
          url: 'http://localhost:12000/login.user',
          data: {
            userID: creds.userID,
            eventID: creds.eventID
          }
        }).success(function(res) {
              deferred.resolve(res);
            }).
              error(function(res) {
                deferred.resolve
            });
            return deferred.promise
    }

  // this.checkAdmin = function() {
  //   console.log("checking admin auth....")
  //   var deferred = $q.defer();
  //   $http({
  //       method: 'GET',
  //       url: 'http://localhost:12000/admin',
  //     }).success(function(data) {
  //           console.log("checkAdmin Success: " + JSON.stringify(data, null, 4))
  //           deferred.resolve(data);
  //         })
  //         return deferred.promise
  //     }

});
