'use strict';

describe('Controller: EventsummaryCtrl', function () {

  // load the controller's module
  beforeEach(module('rafflePrizeAppApp'));

  var EventsummaryCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EventsummaryCtrl = $controller('EventsummaryCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
