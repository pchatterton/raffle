'use strict';

var app = angular.module('rafflePrizeApp');

app.service('AuthService', function ($http, $q, Session) {

  this.login = function(credentials) {
    var deferred = $q.defer();
    $http({
        method: 'POST',
        url: 'http://localhost:12000/login.admin',
        data: credentials
      }).success(function(res) {

          deferred.resolve(res);
      })
    return deferred.promise;
  }
  //
  // return {
  //   login: function (credentials) {
  //     return $http
  //       .post('/login', credentials)
  //       .then(function (res) {
  //         Session.create(res.id, res.userid, res.role);
  //       });
  //   },
  //   isAuthenticated: function () {
  //     return !!Session.userId;
  //   },
  //   isAuthorized: function (authorizedRoles) {
  //     if(!angular.isArray(authorizedRoles)) {
  //       authorizedRoles = [authorizedRoles];
  //     }
  //     return(this.isAuthenticated() &&
  //       authorizedRoles.indexOf(Session.userRole) !== -1)
  //   }
  // };
});
