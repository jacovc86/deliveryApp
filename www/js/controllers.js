(function(angular) {
  'use strict';
  angular.module('deliveryApp')

  .controller('AppCtrl', function($scope, $ionicModal, $timeout, Auth) {
    $scope.location = {};
    $scope.street = {};
    var GeoCoder = new google.maps.Geocoder();
    navigator.geolocation.getCurrentPosition(function(pos) {
      $scope.location.lat = pos.coords.latitude;
      $scope.location.lng = pos.coords.longitude;
      GeoCoder.geocode({location: $scope.location}, function(result,status) {
        $scope.street = result[0].formatted_address;
      });
    });
    Auth.$onAuth(function(authData) {
      $scope.authData = authData;
    });
    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.loginModal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
      $scope.loginModal.hide();
    };

    // Open the login modal
    $scope.showLogin = function() {
      $scope.loginModal.show();
    };

    $scope.localLogin = function(creds) {
      Auth.$authWithPassword(creds).then(function(authData) {
        $scope.loginModal.hide();
      }).catch(function(err) {
        Auth.$createUser(creds).then(function(userData) {
          Auth.$authWithPassword(creds).catch(function(err) {
            console.log(err);
          });
          $scope.loginModal.hide();
        }).catch(function(err) {
          console.error(err);
        });
      });
    };
    $scope.facebookLogin = function() {
      Auth.$authWithOAuthPopup('facebook').then(function(authData) {
        $scope.loginModal.hide();
      }).catch(function(err) {
        console.error(err);
      });
    };
    $scope.googleLogin = function() {
      Auth.$authWithOAuthPopup('google').then(function(authData) {
        $scope.loginModal.hide();
      }).catch(function(err) {
        console.error(err);
      });
    };
    $scope.logout = function() {
      Auth.$unauth();
    };
  })
  .controller('NewpackageCtrl', function($scope, $ionicModal, $timeout) {
    $scope.options = [
      {
        name: 'מעטפה',
        img: ''
      },
      {
        name: 'חבילה קטנה',
        img: ''
      },
      {
        name: 'חבילה גדולה',
        img: ''
      },
    ];
    $scope.selectedSize = $scope.options[0];
    $ionicModal.fromTemplateUrl('sizeselector.html', {
      scope: $scope,
      animation: 'slide-in-right'
    }).then(function(modal) {
      $scope.sizeSelectorModal = modal;
    });
    $scope.closeSizeSelector = function() {
      $scope.sizeSelectorModal.hide();
    };
    $scope.showSizeSelector = function() {
      $scope.sizeSelectorModal.show();
    };
  });

})(angular);