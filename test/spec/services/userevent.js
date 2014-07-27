'use strict';

describe('Service: userEvent', function () {

  // load the service's module
  beforeEach(module('rafflePrizeAppApp'));

  // instantiate service
  var userEvent;
  beforeEach(inject(function (_userEvent_) {
    userEvent = _userEvent_;
  }));

  it('should do something', function () {
    expect(!!userEvent).toBe(true);
  });

});
