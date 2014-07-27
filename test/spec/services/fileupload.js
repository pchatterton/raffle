'use strict';

describe('Service: fileUpload', function () {

  // load the service's module
  beforeEach(module('rafflePrizeAppApp'));

  // instantiate service
  var fileUpload;
  beforeEach(inject(function (_fileUpload_) {
    fileUpload = _fileUpload_;
  }));

  it('should do something', function () {
    expect(!!fileUpload).toBe(true);
  });

});
