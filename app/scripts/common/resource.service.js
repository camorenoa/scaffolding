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