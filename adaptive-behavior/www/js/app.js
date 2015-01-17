angular.module('App', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('Controller', function ($scope, $ionicActionSheet, $ionicPopover) {
  $scope.more = function (event) {
    if (ionic.Platform.isIOS()) {
      $ionicActionSheet.show({
        buttons: [
          {text: 'Just a button'}
        ],
        buttonClicked: function (index) {
          return true;
        }
      });
    } else {
      var popover = $ionicPopover.fromTemplate('<ion-popover-view><button class="button button-full">Just a button</button></ion-popover-view>');
      popover.show(event);
    }
  }
})
