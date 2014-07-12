'use strict';

var app = angular.module('rafflePrizeApp');

app.service('Authentication', function Authentication($http, $q, $location, $cookieStore) {

    this.adminCookiesSetup = function(user) {
      if(typeof user.id == 'number') {
        $cookieStore.put('adminID',user.id);
        $cookieStore.put('adminFirstName', user.firstName);
        $cookieStore.put('adminLastName', user.lastName);
        $cookieStore.put('adminUsername', user.username);
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

    this.verifyAdmin = function() {
      if(!($cookieStore.get('adminID') && $cookieStore.get('role') === 'admin')) {
        $location.path('login');
      }
    }

    this.verifyUser = function() {
      if(!($cookieStore.get('adminID') && $cookieStore.get('role') === 'admin')) {
        $location.path('login');
      }
    }

    this.logout = function() {
      $cookieStore.remove('adminID');
      $cookieStore.remove('adminFirstName');
      $cookieStore.remove('adminLastName');
      $cookieStore.remove('role');
      $cookieStore.put('loggedIn', false)
    }

});
