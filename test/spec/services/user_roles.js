'use strict';

describe('Service: USERROLES', function () {

  // load the service's module
  beforeEach(module('rafflePrizeAppApp'));

  // instantiate service
  var USERROLES;
  beforeEach(inject(function (_USERROLES_) {
    USERROLES = _USERROLES_;
  }));

  it('should do something', function () {
    expect(!!USERROLES).toBe(true);
  });

});
