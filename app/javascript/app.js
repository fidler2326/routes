var myRoutes = angular.module('myRoutes', ['ngRoute']);

myRoutes.config(["$locationProvider", "$routeProvider", function($locationProvider, $routeProvider) {
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
