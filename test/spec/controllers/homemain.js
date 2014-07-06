'use strict';

describe('Controller: HomemainCtrl', function () {

  // load the controller's module
  beforeEach(module('rafflePrizeAppApp'));

  var HomemainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HomemainCtrl = $controller('HomemainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
