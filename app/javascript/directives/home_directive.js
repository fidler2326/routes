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
	})
  .directive('error', function() {
		return {
			restrict: "E",
			templateUrl: "../app/templates/home/_error.html",
			scope: false,
			controller: ["$scope", function($scope) {
        $scope.closeError = function() {
          $scope.error = null;
        }
      }],
			replace: true
		}
	})
  .directive('loading', function() {
		return {
			restrict: "E",
			templateUrl: "../app/templates/home/_loading.html",
			scope: false,
			controller: ["$scope", function($scope) {
        
      }],
			replace: true
		}
	});
