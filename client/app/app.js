(function() {

  'use strict';

  angular
    .module('yeomanGeneratedProjectApp', [
		  'ngCookies',
		  'ngResource',
		  'ngSanitize',
		  'btford.socket-io',
		  'ui.router',
		  'ui.bootstrap',
      'gettext',
      'sg.translation',
      'sg.message'
		])
    .config(config)
    .factory('authInterceptor', authInterceptor)
    .run(run);

  /* @ngInject */
  function config($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');

    $httpProvider.interceptors.push('authInterceptor');
    $httpProvider.interceptors.push('sgHttpInterceptor');
  }

  /* @ngInject */
  function run($rootScope, $location, Auth, gettextCatalog) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });

    // gettext
    $rootScope.setLang = function(lang) {
      if(lang) {
        gettextCatalog.currentLanguage = lang;
      } else {
        gettextCatalog.currentLanguage = 'ko_KR';
      }
    }

    $rootScope.setLang();
  }

  /* @ngInject */
  function authInterceptor($rootScope, $q, $location, storageService) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if (storageService.get('token')) {
          config.headers.Authorization = 'Bearer ' + storageService.get('token');

          console.log('Authorization: ' + config.headers.Authorization  );
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          storageService.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  }

})();
