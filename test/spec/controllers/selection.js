'use strict';

describe('Controller: SelectionCtrl', function () {

  // load the controller's module
  beforeEach(module('rafflePrizeAppApp'));

  var SelectionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SelectionCtrl = $controller('SelectionCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
