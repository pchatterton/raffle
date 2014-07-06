'use strict';

var app = angular.module('rafflePrizeApp');
debugger;
app.service('AuthEvents', {
    loginSucess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
  });
