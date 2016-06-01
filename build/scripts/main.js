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

(function() {
  angular.module('sapient.common', ['ngResource'])
    .config(['$httpProvider', function($httpProvider) {
    	//console.log($httpProvider);
    }]);
}());

(function() {
  angular.module('sapient.footer', ['sapient.common']);
}());

(function() {
  angular.module('sapient.header', ['sapient.common']);
}());

(function() {
  angular
  .module('sapient.common')
  .factory('ResourceFactory', ResourceFactory);

  ResourceFactory.$inject = ['$resource'];

  function ResourceFactory($resource) {
    return {
      rest: function(url, params) {
        return $resource(url, params, {
          get: {
            method: 'GET',
            cancellable: true
          },
          query: {
            method: 'GET',
            cancellable: true,
            isArray: true
          },
          update: {
            method: 'PUT',
            cancellable: true
          },
          save: {
            method: 'POST',
            cancellable: true
          },
          remove: {
            method: 'DELETE',
            cancellable: true
          }
        });
      }
    };
  }
}());
(function() {
  angular
    .module('sapient.footer')
    .factory('FooterFactory', FooterFactory);

    FooterFactory.$inject = ['$resource'];

    function FooterFactory($resource) {
      var footerData = function() {

      };
      return {
        footerData: footerData
      };
    }
}());

(function() {
  angular
    .module('sapient.header')
    .factory('HeaderFactory', HeaderFactory);

    HeaderFactory.$inject = ['$resource'];

    function HeaderFactory($resource) {
      var headerData = function() {

      };
      return {
        headerData: headerData
      };
    }
}());

(function() {
  'use strict';
  
  angular
    .module('sapient.footer')
    .controller('FooterCtrl', FooterCtrl);

    FooterCtrl.$inject = ['ResourceFactory'];

    function FooterCtrl(ResourceFactory) {
  		var vm = this;
  		vm.data = {};
  		vm.event = ResourceFactory.rest('/footer.json');
  		vm.event.get({}, function(data){
  			vm.data = data;
  		});
    }
}());

(function() {
  'use strict';
  
  angular
    .module('sapient.header')
    .controller('HeaderCtrl', HeaderCtrl);

    HeaderCtrl.$inject = ['$window', '$state', 'ResourceFactory', 'LoginFactory'];

    function HeaderCtrl($window, $state, ResourceFactory, LoginFactory) {
      var vm = this;
      vm.data = {};
      vm.event = ResourceFactory.rest('/header.json');
      vm.event.get({}, function(data){
        vm.data = data;
      });

      vm.userLogin = false;
      LoginFactory.initUser()
        .then(function(data) {
          vm.userLogin = true;
          vm.user = data.user;
        })
        .catch(function(error) {
          console.log(error);
        });

      vm.logout = function() {
        $window.localStorage.removeItem('user');
        $state.go('home');
      };
    }
}());

(function() {
  angular
  .module('sapient.common')
  .directive('svgFix', svgFix);

  svgFix.$inject = ['$rootScope'];

  function svgFix($rootScope) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        var attr = 'xlinkHref';
        var initialUrl = attrs[attr];
        var parsingNode = document.createElement('a');

        attrs.$observe(attr, updateValue);
        $rootScope.$on('$locationChangeSuccess', updateValue);

        function updateValue() {
          var newVal;
          parsingNode.setAttribute(
            'href',
            location.pathname + location.search + initialUrl
          );

          newVal = parsingNode.toString();

          if (newVal && attrs[attr] !== newVal) {
            attrs.$set(attr, newVal);
          }
        }
      }
    };
  }
}());
(function() {
  angular
  .module('sapient.footer')
  .directive('footerNav', footerNav);

  function footerNav() {
    return {
      restrict: 'E',
      scope: {
      },
      controller: '@',
      name: 'FooterCtrl',
      templateUrl: '/components/footer/footer.html',
      link: function postLink() {
      }
    };
  }
}());

(function() {
  angular
  .module('sapient.header')
  .directive('headerNav', headerNav);

  function headerNav() {
    return {
      restrict: 'E',
      scope: {
      },
      templateUrl: '/components/header/header.html',
      link: function postLink() {
      }
    };
  }
}());
(function (doc) {
  var scripts = doc.getElementsByTagName('script');
  var script = scripts[scripts.length - 1];
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
      var div = doc.createElement('div');
      div.innerHTML = this.responseText;
      div.style.display = 'none';
      script.parentNode.insertBefore(div, script);
  };
  xhr.open('get', '/assets/icons/svg-icons.svg', true);
  xhr.send();
})(document);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJjb21tb24vY29tbW9uLm1vZHVsZS5qcyIsImNvbXBvbmVudHMvZm9vdGVyL2Zvb3Rlci5tb2R1bGUuanMiLCJjb21wb25lbnRzL2hlYWRlci9oZWFkZXIubW9kdWxlLmpzIiwiY29tbW9uL3Jlc291cmNlLnNlcnZpY2UuanMiLCJjb21wb25lbnRzL2Zvb3Rlci9mb290ZXIuc2VydmljZS5qcyIsImNvbXBvbmVudHMvaGVhZGVyL2hlYWRlci5zZXJ2aWNlLmpzIiwiY29tcG9uZW50cy9mb290ZXIvZm9vdGVyLmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL2hlYWRlci9oZWFkZXIuY29udHJvbGxlci5qcyIsImNvbW1vbi9zdmctZml4LmRpcmVjdGl2ZS5qcyIsImNvbXBvbmVudHMvZm9vdGVyL2Zvb3Rlci5kaXJlY3RpdmUuanMiLCJjb21wb25lbnRzL2hlYWRlci9oZWFkZXIuZGlyZWN0aXZlLmpzIiwic3ZnLXNwcml0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ05BO0FBQ0E7QUFDQTtBQUNBO0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKSB7XG4gIGFuZ3VsYXIubW9kdWxlKCdzYXBpZW50JywgW1xuICAgICdzYXBpZW50LmhlYWRlcicsXG4gICAgJ3NhcGllbnQuZm9vdGVyJyxcbiAgICAndWkucm91dGVyJ1xuICBdKS5jb25maWcoWyckc3RhdGVQcm92aWRlcicsICckdXJsUm91dGVyUHJvdmlkZXInLCAnJGxvY2F0aW9uUHJvdmlkZXInLFxuICAgIGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKSB7XG4gICAgICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSk7XG4gICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG4gICAgICAkc3RhdGVQcm92aWRlclxuICAgICAgICAuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICAgICAgdXJsOiAnLycsXG4gICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICdjb250ZW50Jzoge1xuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy92aWV3cy9sb2dpbi9sb2dpbi52aWV3Lmh0bWwnLFxuICAgICAgICAgICAgICBjb250cm9sbGVyOiAnTG9naW5DdHJsJyxcbiAgICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ2hlYWRlcic6IHtcbiAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvY29tcG9uZW50cy9oZWFkZXIvaGVhZGVyLmh0bWwnLFxuICAgICAgICAgICAgICBjb250cm9sbGVyOiAnSGVhZGVyQ3RybCcsXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdmb290ZXInOiB7XG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL2NvbXBvbmVudHMvZm9vdGVyL2Zvb3Rlci5odG1sJyxcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0Zvb3RlckN0cmwnLFxuICAgICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfV0pXG4gICAgLnJ1bihbJyRyb290U2NvcGUnLCAnJHN0YXRlJywgJyRzdGF0ZVBhcmFtcycsICckbG9jYXRpb24nLFxuICAgICAgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsICRsb2NhdGlvbikge1xuICAgICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3RhcnQnLFxuICAgICAgICAgIGZ1bmN0aW9uKGV2ZW50LCB0b1N0YXRlLCB0b1BhcmFtcywgZnJvbVN0YXRlLCBmcm9tUGFyYW1zLCBvcHRpb25zKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnc3RhdGUgY2hhbmdlJywgZXZlbnQsIHRvU3RhdGUsIHRvUGFyYW1zLCBmcm9tU3RhdGUsIGZyb21QYXJhbXMsIG9wdGlvbnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZUVycm9yJywgZnVuY3Rpb24oZXZlbnQsIHRvU3RhdGUsIHRvUGFyYW1zLCBmcm9tU3RhdGUsIGZyb21QYXJhbXMsIGVycm9yKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ3N0YXRlIGNoYW5nZSBFcnJvcicsIHRvU3RhdGUsIHRvUGFyYW1zLCBlcnJvcik7XG4gICAgICAgICAgaWYoIWVycm9yLmF1dGhlbnRpY2F0ZWQpIHtcbiAgICAgICAgICAgICRzdGF0ZS5nbygnaG9tZScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgXSk7XG59KCkpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICBhbmd1bGFyLm1vZHVsZSgnc2FwaWVudC5jb21tb24nLCBbJ25nUmVzb3VyY2UnXSlcbiAgICAuY29uZmlnKFsnJGh0dHBQcm92aWRlcicsIGZ1bmN0aW9uKCRodHRwUHJvdmlkZXIpIHtcbiAgICBcdC8vY29uc29sZS5sb2coJGh0dHBQcm92aWRlcik7XG4gICAgfV0pO1xufSgpKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgYW5ndWxhci5tb2R1bGUoJ3NhcGllbnQuZm9vdGVyJywgWydzYXBpZW50LmNvbW1vbiddKTtcbn0oKSk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gIGFuZ3VsYXIubW9kdWxlKCdzYXBpZW50LmhlYWRlcicsIFsnc2FwaWVudC5jb21tb24nXSk7XG59KCkpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICBhbmd1bGFyXG4gIC5tb2R1bGUoJ3NhcGllbnQuY29tbW9uJylcbiAgLmZhY3RvcnkoJ1Jlc291cmNlRmFjdG9yeScsIFJlc291cmNlRmFjdG9yeSk7XG5cbiAgUmVzb3VyY2VGYWN0b3J5LiRpbmplY3QgPSBbJyRyZXNvdXJjZSddO1xuXG4gIGZ1bmN0aW9uIFJlc291cmNlRmFjdG9yeSgkcmVzb3VyY2UpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdDogZnVuY3Rpb24odXJsLCBwYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuICRyZXNvdXJjZSh1cmwsIHBhcmFtcywge1xuICAgICAgICAgIGdldDoge1xuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIGNhbmNlbGxhYmxlOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIGNhbmNlbGxhYmxlOiB0cnVlLFxuICAgICAgICAgICAgaXNBcnJheTogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgdXBkYXRlOiB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICAgICAgY2FuY2VsbGFibGU6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNhdmU6IHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgY2FuY2VsbGFibGU6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlbW92ZToge1xuICAgICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgICAgICAgIGNhbmNlbGxhYmxlOiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59KCkpOyIsIihmdW5jdGlvbigpIHtcbiAgYW5ndWxhclxuICAgIC5tb2R1bGUoJ3NhcGllbnQuZm9vdGVyJylcbiAgICAuZmFjdG9yeSgnRm9vdGVyRmFjdG9yeScsIEZvb3RlckZhY3RvcnkpO1xuXG4gICAgRm9vdGVyRmFjdG9yeS4kaW5qZWN0ID0gWyckcmVzb3VyY2UnXTtcblxuICAgIGZ1bmN0aW9uIEZvb3RlckZhY3RvcnkoJHJlc291cmNlKSB7XG4gICAgICB2YXIgZm9vdGVyRGF0YSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZm9vdGVyRGF0YTogZm9vdGVyRGF0YVxuICAgICAgfTtcbiAgICB9XG59KCkpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICBhbmd1bGFyXG4gICAgLm1vZHVsZSgnc2FwaWVudC5oZWFkZXInKVxuICAgIC5mYWN0b3J5KCdIZWFkZXJGYWN0b3J5JywgSGVhZGVyRmFjdG9yeSk7XG5cbiAgICBIZWFkZXJGYWN0b3J5LiRpbmplY3QgPSBbJyRyZXNvdXJjZSddO1xuXG4gICAgZnVuY3Rpb24gSGVhZGVyRmFjdG9yeSgkcmVzb3VyY2UpIHtcbiAgICAgIHZhciBoZWFkZXJEYXRhID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgIH07XG4gICAgICByZXR1cm4ge1xuICAgICAgICBoZWFkZXJEYXRhOiBoZWFkZXJEYXRhXG4gICAgICB9O1xuICAgIH1cbn0oKSk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgXG4gIGFuZ3VsYXJcbiAgICAubW9kdWxlKCdzYXBpZW50LmZvb3RlcicpXG4gICAgLmNvbnRyb2xsZXIoJ0Zvb3RlckN0cmwnLCBGb290ZXJDdHJsKTtcblxuICAgIEZvb3RlckN0cmwuJGluamVjdCA9IFsnUmVzb3VyY2VGYWN0b3J5J107XG5cbiAgICBmdW5jdGlvbiBGb290ZXJDdHJsKFJlc291cmNlRmFjdG9yeSkge1xuICBcdFx0dmFyIHZtID0gdGhpcztcbiAgXHRcdHZtLmRhdGEgPSB7fTtcbiAgXHRcdHZtLmV2ZW50ID0gUmVzb3VyY2VGYWN0b3J5LnJlc3QoJy9mb290ZXIuanNvbicpO1xuICBcdFx0dm0uZXZlbnQuZ2V0KHt9LCBmdW5jdGlvbihkYXRhKXtcbiAgXHRcdFx0dm0uZGF0YSA9IGRhdGE7XG4gIFx0XHR9KTtcbiAgICB9XG59KCkpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIFxuICBhbmd1bGFyXG4gICAgLm1vZHVsZSgnc2FwaWVudC5oZWFkZXInKVxuICAgIC5jb250cm9sbGVyKCdIZWFkZXJDdHJsJywgSGVhZGVyQ3RybCk7XG5cbiAgICBIZWFkZXJDdHJsLiRpbmplY3QgPSBbJyR3aW5kb3cnLCAnJHN0YXRlJywgJ1Jlc291cmNlRmFjdG9yeScsICdMb2dpbkZhY3RvcnknXTtcblxuICAgIGZ1bmN0aW9uIEhlYWRlckN0cmwoJHdpbmRvdywgJHN0YXRlLCBSZXNvdXJjZUZhY3RvcnksIExvZ2luRmFjdG9yeSkge1xuICAgICAgdmFyIHZtID0gdGhpcztcbiAgICAgIHZtLmRhdGEgPSB7fTtcbiAgICAgIHZtLmV2ZW50ID0gUmVzb3VyY2VGYWN0b3J5LnJlc3QoJy9oZWFkZXIuanNvbicpO1xuICAgICAgdm0uZXZlbnQuZ2V0KHt9LCBmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgdm0uZGF0YSA9IGRhdGE7XG4gICAgICB9KTtcblxuICAgICAgdm0udXNlckxvZ2luID0gZmFsc2U7XG4gICAgICBMb2dpbkZhY3RvcnkuaW5pdFVzZXIoKVxuICAgICAgICAudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgdm0udXNlckxvZ2luID0gdHJ1ZTtcbiAgICAgICAgICB2bS51c2VyID0gZGF0YS51c2VyO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgIH0pO1xuXG4gICAgICB2bS5sb2dvdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgJHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndXNlcicpO1xuICAgICAgICAkc3RhdGUuZ28oJ2hvbWUnKTtcbiAgICAgIH07XG4gICAgfVxufSgpKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgYW5ndWxhclxuICAubW9kdWxlKCdzYXBpZW50LmNvbW1vbicpXG4gIC5kaXJlY3RpdmUoJ3N2Z0ZpeCcsIHN2Z0ZpeCk7XG5cbiAgc3ZnRml4LiRpbmplY3QgPSBbJyRyb290U2NvcGUnXTtcblxuICBmdW5jdGlvbiBzdmdGaXgoJHJvb3RTY29wZSkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgbGluazogZnVuY3Rpb24gcG9zdExpbmsoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHZhciBhdHRyID0gJ3hsaW5rSHJlZic7XG4gICAgICAgIHZhciBpbml0aWFsVXJsID0gYXR0cnNbYXR0cl07XG4gICAgICAgIHZhciBwYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblxuICAgICAgICBhdHRycy4kb2JzZXJ2ZShhdHRyLCB1cGRhdGVWYWx1ZSk7XG4gICAgICAgICRyb290U2NvcGUuJG9uKCckbG9jYXRpb25DaGFuZ2VTdWNjZXNzJywgdXBkYXRlVmFsdWUpO1xuXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZVZhbHVlKCkge1xuICAgICAgICAgIHZhciBuZXdWYWw7XG4gICAgICAgICAgcGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgJ2hyZWYnLFxuICAgICAgICAgICAgbG9jYXRpb24ucGF0aG5hbWUgKyBsb2NhdGlvbi5zZWFyY2ggKyBpbml0aWFsVXJsXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIG5ld1ZhbCA9IHBhcnNpbmdOb2RlLnRvU3RyaW5nKCk7XG5cbiAgICAgICAgICBpZiAobmV3VmFsICYmIGF0dHJzW2F0dHJdICE9PSBuZXdWYWwpIHtcbiAgICAgICAgICAgIGF0dHJzLiRzZXQoYXR0ciwgbmV3VmFsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG59KCkpOyIsIihmdW5jdGlvbigpIHtcbiAgYW5ndWxhclxuICAubW9kdWxlKCdzYXBpZW50LmZvb3RlcicpXG4gIC5kaXJlY3RpdmUoJ2Zvb3Rlck5hdicsIGZvb3Rlck5hdik7XG5cbiAgZnVuY3Rpb24gZm9vdGVyTmF2KCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgc2NvcGU6IHtcbiAgICAgIH0sXG4gICAgICBjb250cm9sbGVyOiAnQCcsXG4gICAgICBuYW1lOiAnRm9vdGVyQ3RybCcsXG4gICAgICB0ZW1wbGF0ZVVybDogJy9jb21wb25lbnRzL2Zvb3Rlci9mb290ZXIuaHRtbCcsXG4gICAgICBsaW5rOiBmdW5jdGlvbiBwb3N0TGluaygpIHtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59KCkpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICBhbmd1bGFyXG4gIC5tb2R1bGUoJ3NhcGllbnQuaGVhZGVyJylcbiAgLmRpcmVjdGl2ZSgnaGVhZGVyTmF2JywgaGVhZGVyTmF2KTtcblxuICBmdW5jdGlvbiBoZWFkZXJOYXYoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICBzY29wZToge1xuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlVXJsOiAnL2NvbXBvbmVudHMvaGVhZGVyL2hlYWRlci5odG1sJyxcbiAgICAgIGxpbms6IGZ1bmN0aW9uIHBvc3RMaW5rKCkge1xuICAgICAgfVxuICAgIH07XG4gIH1cbn0oKSk7IiwiKGZ1bmN0aW9uIChkb2MpIHtcbiAgdmFyIHNjcmlwdHMgPSBkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpO1xuICB2YXIgc2NyaXB0ID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdO1xuICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgZGl2ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgZGl2LmlubmVySFRNTCA9IHRoaXMucmVzcG9uc2VUZXh0O1xuICAgICAgZGl2LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICBzY3JpcHQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZGl2LCBzY3JpcHQpO1xuICB9O1xuICB4aHIub3BlbignZ2V0JywgJy9hc3NldHMvaWNvbnMvc3ZnLWljb25zLnN2ZycsIHRydWUpO1xuICB4aHIuc2VuZCgpO1xufSkoZG9jdW1lbnQpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
