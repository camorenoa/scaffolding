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