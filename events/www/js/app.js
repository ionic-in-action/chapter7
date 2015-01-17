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

.directive('box', function () {
  return {
    restrict: 'E',
    link: function (scope, element) {
      var time = 0, boxX = 0, boxY = 0;
      var leftBound = window.innerWidth - 50;
      var bottomBound = window.innerHeight - 50;
      scope.top = 0;
      scope.left = 0;
      
      scope.startTouch = function (event) {
        time = event.timeStamp;
      };
      scope.endTouch = function (event) {
        console.log('You held the box for ' + (event.timeStamp - time) + 'ms');
        boxX = scope.left;
        boxY = scope.top;
      };
      scope.drag = function (event) {
        var left = boxX + Math.round(event.gesture.deltaX);
        var top = boxY + Math.round(event.gesture.deltaY);

        if (left > leftBound) {
          scope.left = leftBound;
        } else if (left < 0) {
          scope.left = 0;
        } else {
          scope.left = left;
        }
        if (top > bottomBound) {
          scope.top = bottomBound;
        } else if (top < 0) {
          scope.top = 0;
        } else {
          scope.top = top;
        }
      };
    },
    template: '<div id="box" class="icon ion-cube" on-touch="startTouch($event)" on-release="endTouch($event)" on-drag="drag($event)" ng-style="{top: top + \'px\', left: left + \'px\'}"></div>'
  }
})
