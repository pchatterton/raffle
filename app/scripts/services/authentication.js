'use strict';

var app = angular.module('rafflePrizeApp');

app.service('Authentication', function Authentication($http, $q, $location, $cookieStore, $state, $rootScope) {

    this.adminCookiesSetup = function(admin) {
      if(typeof admin.id == 'number') {
        $cookieStore.put('adminID',admin.id);
        $cookieStore.put('adminFirstName', admin.firstName);
        $cookieStore.put('adminLastName', admin.lastName);
        $cookieStore.put('adminUsername', admin.username);
        $cookieStore.put('role','admin');
        $cookieStore.put('loggedIn', true)
          return true;
      } else {
          return false;
      }
    }

    this.verifyLoggedIn = function() {
      if(!($cookieStore.get('loggedIn'))) {
        return false;
      }
        return true;
    }

    // this.verifyAdmin = function() {
    //   console.log('verify admin')
    //   if(!($cookieStore.get('adminID') && $cookieStore.get('role') === 'admin')) {
    //     $location.path('login');
    //   }
    // }

    // this.verifyUser = function() {
    //   if(!($cookieStore.get('adminID') && $cookieStore.get('role') === 'admin')) {
    //     $location.path('login');
    //   }
    // }

    this.logout = function() {
      if($cookieStore.get('adminID') && $cookieStore.get('role') === 'admin') {
        $cookieStore.remove('adminID');
        $cookieStore.remove('adminFirstName');
        $cookieStore.remove('adminLastName');
        $cookieStore.remove('role');
        $cookieStore.put('loggedIn', false)
      } else {
          $cookieStore.remove('userID');
          $cookieStore.remove('eventID');
          $cookieStore.put('UserRole', false);
          $cookieStore.put('loggedIn', false)
      }
      $rootScope.loggedIn = false;
      $rootScope.userShow = false;
      $state.go('main')
    }

    this.userCookiesSetup = function(user) {
      if(typeof user.id == 'number') {
        $cookieStore.put('userID',user.id);
        $cookieStore.put('eventID',user.EventID);
        $cookieStore.put('UserRole',true);
        $cookieStore.put('loggedIn', true)
          return true;
      } else {
          return false;
      }
    }

    this.verifyUser = function() {
      if(!($cookieStore.get('userID') && $cookieStore.get('role') === 'user')) {
        console.log('sorry user')
        $location.path('login');
      }
    }

});
