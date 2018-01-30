var mainApp = angular.module('mainApp', ['ngRoute']);
var mainApp = angular.module('mainApp', ['ngRoute']);

mainApp.config(["$locationProvider", "$routeProvider", function($locationProvider, $routeProvider) {
  $routeProvider.when('/home', {
      templateUrl: "/app/templates/home/home.html",
      controller: 'HomeController'
    })
    .when('/about', {
      templateUrl: "/app/templates/about/about.html",
      controller: 'AboutController'
    })
    .otherwise({
    redirectTo: '/',
    templateUrl: "/app/templates/home/home.html",
    controller: 'HomeController'
  });
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}]);
