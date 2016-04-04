(function() {

  'use strict';

  angular
    .module('yeomanGeneratedProjectApp')
    .service('sgAlert', SgAlert);

  /* @ngInject */
  function SgAlert(gettextCatalog) {
    this.hi = function (){
      return 'hi';
    };

    this.success = function(msg) {
      toastr.success(getMessage(msg));
    };

    this.information = function(msg) {
      toastr.info(getMessage(msg));
    };

    this.warning = function(msg) {
      toastr.warning(getMessage(msg));
    };

    this.error = function(msg,err) {
      toastr.error(getMessage(msg));

      if(err) {
        if(bowser.chrome) {
          console.table([{'message': msg, 'error': err}]);
        } else {
          console.log({'message': msg, 'error': err});
        }
      }
    };

    function getMessage(msg) {
      return gettextCatalog.getString(msg);
    };


  }

})();
