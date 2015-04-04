angular.module('App', ['ionic'])
.run(function($rootScope, $window) {

  alert($window.navigator.onLine);

  $window.addEventListener('offline', function() {
    alert('offline');
    $rootScope.$digest();
  });

  $window.addEventListener('online', function() {
    alert('online');
    $rootScope.$digest();
  });

})
