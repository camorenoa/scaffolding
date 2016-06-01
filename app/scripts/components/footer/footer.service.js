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
