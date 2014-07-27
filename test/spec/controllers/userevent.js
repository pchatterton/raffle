'use strict';

describe('Controller: UsereventCtrl', function () {

  // load the controller's module
  beforeEach(module('rafflePrizeAppApp'));

  var UsereventCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UsereventCtrl = $controller('UsereventCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
