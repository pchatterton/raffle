'use strict';

var app = angular.module('rafflePrizeApp');
debugger;
app.factory('AuthService', function ($http, Session) {
  return {
    login: function (credentials) {
      return $http
        .post('/login', credentials)
        .then(function (res) {
          Session.create(res.id, res.userid, res.role);
        });
    },
    isAuthenticated: function () {
      return !!Session.userId;
    },
    isAuthorized: function (authorizedRoles) {
      if(!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      return(this.isAuthenticated() &&
        authorizedRoles.indexOf(Session.userRole) !== -1)
    }
  };
});
