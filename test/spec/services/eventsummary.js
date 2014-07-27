'use strict';

describe('Service: eventSummary', function () {

  // load the service's module
  beforeEach(module('rafflePrizeAppApp'));

  // instantiate service
  var eventSummary;
  beforeEach(inject(function (_eventSummary_) {
    eventSummary = _eventSummary_;
  }));

  it('should do something', function () {
    expect(!!eventSummary).toBe(true);
  });

});
