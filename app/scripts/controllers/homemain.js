'use strict';

var app = angular.module('rafflePrizeApp');

app.controller('homeMainCtrl', function ($scope, $cookieStore, Authentication, $location, $state) {

    $scope.loginBtnVis = false;
    $scope.signupBtnVis = false;

    $scope.$on('updateMainBtn', function(event, change) {
      if(change === 'login') {
        $scope.loginBtnVis = true;
        $scope.signupBtnVis = false;
      } else if(change === 'signup') {
        $scope.loginBtnVis = false;
        $scope.signupBtnVis = true;
      }
    });

  $scope.clickHome = function() {
    $scope.loginBtnVis = false;
    $scope.signupBtnVis = false;
  }

  $scope.$on('$locationChangeStart', function(event, next, current) {
    if(next.indexOf('admin') !== -1) {
      if(!$cookieStore.get('loggedIn')) {
        $state.go('login');
      }
    }

  })

  $scope.logout = function() {
    Authentication.logout();
    $scope.loginBtnVis = false;
    $scope.signupBtnVis = false;
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
      })
      .state('event', {
        url: '/userEvent',
        templateUrl: 'views/event.html',
        controller: 'userEventCtrl',
      })
// Admin stateProvider =========================================================
      .state('admin.event', {
        url: '/event',
        templateUrl: 'views/events/event.html',
        controller: 'EventCtrl',
      })

// Event stateProviders ========================================================
      .state('admin.event.summary', {
        url: '/summary',
        templateUrl: 'views/events/summary.html',
        controller: 'EventsummaryCtrl',
      })
      .state('admin.event.createEvent', {
        url: '/createEvent',
        templateUrl: 'views/events/createEvent.html',
        controller: 'EventcreateCtrl',
      })
      .state('admin.event.prizes', {
        url: '/prizes',
        templateUrl: 'views/events/prizes.html',
        controller: 'AdminprizesCtrl',
      })
      .state('admin.event.registrants', {
        url: '/registrants',
        templateUrl: 'views/events/registrants.html',
        controller: 'RegistrantsCtrl'
      })
// End of app.config ===========================================================
  });

    app.run(function($state){});
