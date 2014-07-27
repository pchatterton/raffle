'use strict';

describe('Controller: AdminprizesCtrl', function () {

  // load the controller's module
  beforeEach(module('rafflePrizeAppApp'));

  var AdminprizesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminprizesCtrl = $controller('AdminprizesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
