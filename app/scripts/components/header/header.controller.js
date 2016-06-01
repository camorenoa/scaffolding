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
