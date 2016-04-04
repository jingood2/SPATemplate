'use strict';

describe('Service: storageService', function () {

  // load the service's module
  beforeEach(module('yeomanGeneratedProjectApp'));

  // instantiate service
  var storageService;
  beforeEach(inject(function (_storageService_) {
    storageService = _storageService_;
  }));

  it('should exist', function () {
    expect(!!storageService).toBe(true);
  });

  it('should do setValue & getValue', function() {
    //storageService.set('user-token','abcdefg123');
    expect(storageService.get('user-token')).toEqual('abcdefg123');
    storageService.flush();
  });

  it('should do removable', function() {
    //storageService.set('user-token','abcdefg123');
    expect(storageService.get('user-token')).toEqual('abcdefg123');
    storageService.remove('user-token');
    expect(storageService.get('user-token')).toBe(null);
  });

  it('should do setTTL',function(done){
    storageService.set('user-token','abcdefg123');
    expect(storageService.get('user-token')).toEqual('abcdefg123');
    storageService.setTTL('user-token',1000);
    expect(storageService.get('user-token')).toBe('abcdefg123');
    setTimeout(function(){
      expect(storageService.get('user-token')).toBe(null);
      done();
    },2000);

  });

});
