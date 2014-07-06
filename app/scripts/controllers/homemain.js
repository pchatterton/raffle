'use strict';

var app = angular.module('rafflePrizeApp');

app.controller('homeMainCtrl', function ($scope) {
  });

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'views/home.html',
        // controller: 'MainHomeCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      })
  });
    app.run(function($state){});
