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
