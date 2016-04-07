(function() {

  'use strict';

  angular
    .module('yeomanGeneratedProjectApp')
    .controller('AuthCtrl', AuthCtrl);

  /* @ngInject */
  function AuthCtrl($location, Auth) {

    Auth.loginOAuth(function(){
      $location.path('/');
    })

  }

})();
