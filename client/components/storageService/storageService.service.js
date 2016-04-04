(function() {

  'use strict';

  angular
    .module('yeomanGeneratedProjectApp')
    .service('storageService', StorageService);

  /* @ngInject */
  function StorageService() {
    this.set = function(key,value,options){
      angular.element.jStorage.set(key,value,options);
    };

    this.get = function(key){
      return angular.element.jStorage.get(key);
    };

    this.remove = function(key) {
      angular.element.jStorage.deleteKey(key);
    }

    this.flush = function() {
      angular.element.jStorage.flush();
    }

    this.setTTL = function(key,ttl) {
      angular.element.jStorage.setTTL(key,ttl);
    }
  }

})();
