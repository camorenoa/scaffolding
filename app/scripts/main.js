(function() {
  angular.module('sapient', [
    'sapient.header',
    'sapient.footer',
    'ui.router'
  ]).config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
      $urlRouterProvider.otherwise('/');
      $stateProvider
        .state('home', {
          url: '/',
          views: {
            'content': {
              templateUrl: '/views/login/login.view.html',
              controller: 'LoginCtrl',
              controllerAs: 'vm'
            },
            'header': {
              templateUrl: '/components/header/header.html',
              controller: 'HeaderCtrl',
              controllerAs: 'vm'
            },
            'footer': {
              templateUrl: '/components/footer/footer.html',
              controller: 'FooterCtrl',
              controllerAs: 'vm'
            }
          }
        });

    }])
    .run(['$rootScope', '$state', '$stateParams', '$location',
      function($rootScope, $state, $stateParams, $location) {
        $rootScope.$on('$stateChangeStart',
          function(event, toState, toParams, fromState, fromParams, options) {
            // console.log('state change', event, toState, toParams, fromState, fromParams, options);
          }
        );
        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
          // console.log('state change Error', toState, toParams, error);
          if(!error.authenticated) {
            $state.go('home');
          }
        });
      }
    ]);
}());
