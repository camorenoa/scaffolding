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
