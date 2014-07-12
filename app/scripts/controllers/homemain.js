'use strict';

var app = angular.module('rafflePrizeApp');

app.controller('homeMainCtrl', function ($scope, $cookieStore, Authentication, $location) {

    $scope.$watch(function () { return Authentication.verifyLoggedIn(); },
      function (value) {
        $scope.loggedIn = value;
      }
    );

    $scope.logout = function() {
      var test = $cookieStore.get('loggedIn')
      Authentication.logout();
      $location.path('/');
    }
  });

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

// Main stateProviders =========================================================
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'views/home.html',
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl',
      })
      .state('admin', {
        url: '/admin',
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl',
        resolve: {
          verifyAdmin: function(Authentication) {
            Authentication.verifyAdmin()
          }
        }
      })
// Admin stateProvider =========================================================
      .state('admin.event', {
        url: '/event',
        templateUrl: 'views/events/event.html',
          verifyAdmin: function(Authentication) {
            Authentication.verifyAdmin()
          }
      })
  });

    app.run(function($state){});
