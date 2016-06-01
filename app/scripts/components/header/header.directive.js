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