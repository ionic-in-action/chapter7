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

.controller('Controller', function ($scope, Storage) {
  $scope.items = Storage.get();

  $scope.clear = function () {
    $scope.items = [];
    Storage.set([]);
  };
  $scope.add = function () {
    $scope.items.push(Math.round(Math.random() * 1000));
    Storage.set($scope.items);
  };
})

.factory('Storage', function () {
  var Storage = {};
  Storage.get = function () {
    var items;
    try {
      items = localStorage.getItem('items');
      if (items) {
        items = angular.fromJson(items);
      } else {
        items = [];
      }
    } catch (e) {
      console.log('Could not read from localStorage');
    }
    return items;
  };
  Storage.set = function (items) {
    try {
      localStorage.setItem('items', angular.toJson(items));
    } catch (e) {
      console.log('Could not write to localStorage');
    }
  };
  return Storage;
})
