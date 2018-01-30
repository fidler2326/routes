angular.module('myRoutes')
  .directive('routeCard', function() {
		return {
			restrict: "E",
			templateUrl: "../app/templates/home/_route_card.html",
			scope: false,
			controller: ["$scope", function($scope) {

      }],
			replace: true
		}
	})
  .directive('newRouteForm', function() {
		return {
			restrict: "E",
			templateUrl: "../app/templates/home/_form.html",
			scope: false,
			controller: ["$scope", function($scope) {

      }],
			replace: true
		}
	});
