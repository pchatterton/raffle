'use strict';

var app = angular.module('rafflePrizeApp');

app.factory('Prizes', function Event($http, $q, $cookieStore, $upload, Event, $location) {

    var prizeService = {};
    var prizeData = [];

    prizeService.createPrize = function(files, newPrize) {

      var status = prizeService.prizeEnable(newPrize.status)

      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        $upload.upload({
          url: 'http://localhost:12000/event/prize.create',
          method: 'POST',
          data: {
            adminID: $cookieStore.get('adminID'),
            eventID: Event.getEventId(),
            prizeName: newPrize.name,
            prizeDescription: newPrize.description,
            prizeStatus: status
          },
          file: file
      }).progress(function(evt) {
          console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      }).success(function(data) {
        prizeService.prizeEnable(newPrize.status)
      }).error(function(data) {
          //error
      });
    }}

    prizeService.prizeEnable = function(status) {
      if(status = 'enabled') {
        return 1
      } else {
        return 0
      }
    }

    prizeService.getInitPrizeData = function() {
      prizeData = [];
      var eventId = Event.getEventId()
      var deferred = $q.defer();
      $http({
          method: 'GET',
          url: 'http://localhost:12000/event/prize/' + eventId
        }).success(function(res) {
              prizeService.addPrizeData(res)
              deferred.resolve(res);
            }).
              error(function(res) {
                deferred.resolve
            });
            return deferred.promise
    }

    prizeService.addPrizeData = function(data) {
      prizeData.push(data);
    }

    prizeService.getPrizeData = function(eID) {

      prizeData = [];
      var eventId = eID
      var deferred = $q.defer();
      $http({
          method: 'GET',
          url: 'http://localhost:12000/event/prize/' + eventId
        }).success(function(res) {
          prizeService.addPrizeData(res)
          deferred.resolve(res);
        }).
          error(function(res) {
            deferred.resolve
          });
      return deferred.promise

    }

    return prizeService;
}); //close factory
