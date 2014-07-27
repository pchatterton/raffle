'use strict';

describe('Service: prizes', function () {

  // load the service's module
  beforeEach(module('rafflePrizeAppApp'));

  // instantiate service
  var prizes;
  beforeEach(inject(function (_prizes_) {
    prizes = _prizes_;
  }));

  it('should do something', function () {
    expect(!!prizes).toBe(true);
  });

});
