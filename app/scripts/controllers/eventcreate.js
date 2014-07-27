'use strict';

var app = angular.module('rafflePrizeApp');
app.controller('EventcreateCtrl', function ($scope, Event, $location) {

  var init = function () {
    var events = Event.refreshEventInfo();
    if(events.length === 0) {
      Event.createView(false);
    } else {
      Event.createView(true);
    }
    $scope.eventForm = Event.getView();
  }

  init()

  $scope.showForm = function() {
    if(Event.getView()) {
      Event.createView(false);
    } else {
      Event.createView(true);
    }
    $scope.eventForm = Event.getView();
  }

  var refreshForm = function() {
    $scope.newEvent = {
      eventName: '',
      Description: '',
      Location: '',
      startNumVotes: ''
    }
  }

  $scope.createEvent = function(newEvent) {
    Event.createEventFinal(newEvent).then(function(events) {
      refreshForm();
      Event.createEventTemp(events.eventData)
    })
    $location.path('admin/event/summary')
  }

  });
