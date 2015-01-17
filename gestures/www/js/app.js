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

.directive('card', function () {
  return {
    scope: true,
    controller: function ($scope, $element, $ionicGesture, $interval) {
      $scope.left = 0;

      $ionicGesture.on('drag', function (event) {
        $scope.left = event.gesture.deltaX;
        $scope.$digest();
      }, $element);

      $ionicGesture.on('dragend', function (event) {
        if (Math.abs($scope.left) > (window.innerWidth / 3)) {
          $scope.left = ($scope.left < 0) ? -window.innerWidth : window.innerWidth;
          $element.remove();
        } else {
          var interval = $interval(function () {
            if ($scope.left < 5 && $scope.left > -5) {
              $scope.left = 0;
              $interval.cancel(interval);
            } else {
              $scope.left = ($scope.left < 0) ? $scope.left + 5 : $scope.left - 5;
            }
          }, 5);
        }
        $scope.$digest();
      }, $element);
    },
    transclude: true,
    template: '<div class="list card" ng-style="{left: left + \'px\'}"><div class="item" ng-transclude>Swipe Me</div></div>'
  }
})
