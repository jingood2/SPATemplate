(function() {

  'use strict';

  angular
    .module('yeomanGeneratedProjectApp')
    .controller('SettingsCtrl', SettingCtrl);

  /* @ngInject */
  function SettingCtrl($scope, User, Auth) {
    $scope.errors = {};
    $scope.changePassword = changePassword;

    function changePassword(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
    };
  };

})();  
