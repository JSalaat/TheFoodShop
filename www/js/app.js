
var foodShop = angular.module('foodShop', ['ionic','firebase','ngCordova'])

.run(function($ionicPlatform) {
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
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'dashController'
      }
    }
  })

  .state('tab.restName', {
    url: '/dash/:name',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-restName.html',
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
