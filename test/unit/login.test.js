/* jshint ignore:start */
'use strict';

describe("Login component", function() {

  var controller;
  var scope;
  var user = readJSON('test/fixture/user.json');

  /** Angular logic */
  var fakeWindow = {
    location: {
      href: ''
    },
    localStorage: {
      setItem: function(){
        return '';
      },
      removeItem: function(){
        return '';
      }
    }
  };

  var fakeState = {
    go: function () {
      return '';
    }
  };

  beforeEach(module('sapient.login'));
  beforeEach(module('ui.router'));
  beforeEach(inject(function($rootScope, $window, $state, $controller, ResourceFactory, LoginFactory){
    scope = $rootScope.$new();
    controller = $controller('LoginCtrl', {
      '$scope': scope,
      '$window': fakeWindow,
      '$state': fakeState,
      'ResourceFactory': ResourceFactory,
      'LoginFactory': LoginFactory
    });
    controller.user = {
      email: user.email,
      password: user.password
    };
  }));

  describe('cases', function(){
    it('Send form empty', function(){
      controller.data.email = '';
      controller.data.password = '';
      controller.signIn();
      expect(controller.errorMessage.success).toBe(false);
      expect(controller.errorMessage.message).toBe(user.error_message);
    });

    it('Send form with empty email', function(){
      controller.data.email = '';
      controller.data.password = user.password;
      controller.signIn();
      expect(controller.errorMessage.success).toBe(false);
      expect(controller.errorMessage.message).toBe(user.error_message);
    });

    it('Send form with empty password', function(){
      controller.data.email = user.email;
      controller.data.password = '';
      controller.signIn();
      expect(controller.errorMessage.success).toBe(false);
      expect(controller.errorMessage.message).toBe(user.error_message);
    });
  });
  
  describe('functionality', function () {
    it('Send form to the API', function() {
      controller.data.email = user.email;
      controller.data.password = user.password;
      controller.signIn();
      expect(controller.errorMessage.success).toBe(true);
    });
  });
});