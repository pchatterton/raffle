'use strict';

var app = angular.module('rafflePrizeApp');

app.factory('Registrants', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
