'use strict';

describe('Service: userRoles', function () {

  // load the service's module
  beforeEach(module('rafflePrizeAppApp'));

  // instantiate service
  var userRoles;
  beforeEach(inject(function (_userRoles_) {
    userRoles = _userRoles_;
  }));

  it('should do something', function () {
    expect(!!userRoles).toBe(true);
  });

});
