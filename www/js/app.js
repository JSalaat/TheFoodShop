
var foodShop = angular.module('foodShop', ['ionic','firebase','ngCordova'])

.run(function($ionicPlatform,$rootScope) {
      $rootScope.cart = [];

      $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })


  .state('tab.dash', {
    url: '/dash',
    cache: false,
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'dashController'
      }
    }
  })

  .state('tab.restName', {
    url: '/dash/:id',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-rest-name.html',
        controller: 'restNameController'
      }
    }
  })

  .state('tab.cart', {
    url: '/cart',
    views: {
      'tab-dash': {
        templateUrl: 'templates/cart.html',
        controller: 'cartController'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'accountsController'
      }
    }
  });

  $urlRouterProvider.otherwise('/tab/account');

});

foodShop.config(['$ionicConfigProvider', function($ionicConfigProvider) {

  $ionicConfigProvider.tabs.position('bottom');

}]);
