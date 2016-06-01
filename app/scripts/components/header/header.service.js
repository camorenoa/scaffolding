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
