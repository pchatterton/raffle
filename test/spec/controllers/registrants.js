'use strict';

describe('Controller: RegistrantsCtrl', function () {

  // load the controller's module
  beforeEach(module('rafflePrizeAppApp'));

  var RegistrantsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RegistrantsCtrl = $controller('RegistrantsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
