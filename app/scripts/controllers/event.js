'use strict';

var app = angular.module('rafflePrizeApp');

app.controller('EventCtrl', function ($scope, Event, $location, $cookieStore, $state) {
  //Set the show hide depending on zero events
  $scope.showEvents = true
  $scope.zeroEvents = false;

  angular.element('.eventMenuFocus').trigger('focus');

  var refreshData = function () {
    var events = Event.refreshEventInfo();

    if(events.length === 0) {
      $scope.showEvents = false
      $scope.zeroEvents = true;
      $location.path('admin/event/createEvent')
    } else {
      $scope.eventNames = events
      $scope.myEvents = events[0];
      Event.setEventId(events[0].id);
      $scope.showEvents = true;
      $scope.zeroEvents = false;
      $state.go('admin.event.summary')
    }
  }

  var getData = function(creds) {
    Event.getEventInfo().then(function(events) {
      refreshData();
    })
  }

  getData()

  $scope.updateEventInfo = function(selEvent) {
    Event.setEventId($scope.myEvents.id);
    $scope.myEvents = selEvent;
    $scope.$broadcast('udpateEventID', $scope.myEvents.id);
  }

});
