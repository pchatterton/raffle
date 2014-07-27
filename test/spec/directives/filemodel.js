'use strict';

describe('Directive: fileModel', function () {

  // load the directive's module
  beforeEach(module('rafflePrizeAppApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<file-model></file-model>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the fileModel directive');
  }));
});
