'use strict';

describe('Controller: EventCtrl', function () {

  // load the controller's module
  beforeEach(module('rafflePrizeAppApp'));

  var EventCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EventCtrl = $controller('EventCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
