(function(angular) {
  'use strict';
  angular.module('deliveryApp', ['ionic','firebase']) //,'ionic.service.core', 'ionic.service.push'])

  .run(function($ionicPlatform) {//, $ionicPush) {
    $ionicPlatform.ready(function() {
      /*$ionicPush.init({
        "debug": true,
        "onNotification": function(notification) {
          var payload = notification.payload;
        },
        "onRegister": function(data) {
        }
      });

      $ionicPush.register();*/
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })
    .state('app.entry', {
      url: '/entry',
      views: {
        'menuContent': {
          templateUrl: 'templates/entry.html'
        }
      }
    })
    .state('app.newpackage', {
      url: '/newpackage',
      views: {
        'menuContent': {
          templateUrl: 'templates/newpackage.html',
          controller: 'NewpackageCtrl'
        }
      }
    });
    $urlRouterProvider.otherwise('/app/entry');
  });
})(angular);

