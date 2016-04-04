(function() {

  'use strict';

  angular
    .module('yeomanGeneratedProjectApp')
    .factory('sgHttpInterceptor', SgHttpInterceptor);

  /* @ngInject */
  function SgHttpInterceptor($q,sgAlert) {
    // Service logic

    // Public API here
    return {
      'request' : request,
      'requestError' : requestError,
      'response' : response,
      'responseError' : responseError
    };


    function request(config) {
      console.log('config:' + config);
      return config;
    }

    function requestError(rejection) {
      return $q.reject(rejection);
    }

    function response(response) {
      return response;
    }

    function responseError(rejection) {
      var msg= httpType(rejection.status);

      if(rejection.data.message) {
        msg.value = rejection.data.message;
      }
      sgAlert.error(msg.value,msg.code);
      return $q.reject(rejection);
    }

    function httpType(status) {
      var msg = null;

      if(status == 400) {



        msg = {
          code : 'BAD REQUEST',
          value : 'You send a Bad request. send the right thing.'
        }

      } else if (status == 401) {
        msg = {
          code : 'UNAUTHORIZED',
          value : 'Login Required. Or login info is expired.'
        }

      } else if (status === 403) {
        msg = {
          code : 'FORBIDDEN',
          value : 'Your Authorized is forbidden. Request the authorization to administrator.'
        }

      }else if (status === 404) {
        msg = {
          code : 'NOT FOUND',
          value : 'Not found the content.'
        }

      } else if (status == 500) {
        msg = {
          code : 'SERVER ERROR',
          value : 'Internal Server Error.'
        }

      }

      return msg;
    }
  }

})();
