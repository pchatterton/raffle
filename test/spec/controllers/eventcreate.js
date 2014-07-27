'use strict';

describe('Controller: EventcreateCtrl', function () {

  // load the controller's module
  beforeEach(module('rafflePrizeAppApp'));

  var EventcreateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EventcreateCtrl = $controller('EventcreateCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
