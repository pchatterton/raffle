'use strict';

var app = angular.module('rafflePrizeApp');

app.factory('Event', function Event($http, $q, $location, $cookieStore) {

    var eventService = {};
    var eventData = [];
    var selectedEventID = '';
    var adminId = '';
    var createView = false;

    eventService.getEventInfo = function(adminID) {
      adminId = $cookieStore.get('adminID')
      var deferred = $q.defer();
      $http({
          method: 'GET',
          url: 'http://localhost:12000/event/' + adminId
        }).success(function(res) {
              eventData = res;
              deferred.resolve(res);
            }).
              error(function(res) {
                deferred.resolve
            });
            return deferred.promise
        }

      eventService.refreshEventInfo = function() {
          return eventData;
      }

      eventService.setEventId = function (id) {
          selectedEventID = id;
      }

      eventService.getEventId = function () {
        return selectedEventID
      }

      eventService.createEventTemp = function(eventObj) {
        eventData.push(eventObj)
      }

      eventService.createEventFinal = function(eventObj) {
        adminId = $cookieStore.get('adminID')
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: 'http://localhost:12000/event.create',
            data: {
                eventName: eventObj.eventName,
                Description: eventObj.Description,
                Location: eventObj.Location,
                startNumVotes: eventObj.startNumVotes,
                adminID: adminId
            }
          }).success(function(res) {
                deferred.resolve(res);
              }).
                error(function(res) {
                  deferred.resolve
              });
              return deferred.promise
          }

      eventService.createView = function(bol) {
        createView = bol;
      }

      eventService.getView = function () {
        return createView;
      }

      eventService.updateStatus = function (status, eID) {
        var deferred = $q.defer();
        $http({
          method: 'PUT',
          url: 'http://localhost:12000/event.status',
          data: {
              id: eID,
              status: status
          }
        }).success(function(res) {
              deferred.resolve(res);
            }).
              error(function(res) {
                deferred.resolve
            });
            return deferred.promise
      }


      return eventService;
  });
