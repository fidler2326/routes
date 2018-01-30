myRoutes.controller("HomeController", ['$scope', '$http', function($scope, $http) {
  console.log("HomeController");

  $scope.route_from = null;
  $scope.route_to = null;
  $scope.my_routes = JSON.parse(localStorage.getItem("my_routes")) || [];
  $scope.saved_routes = JSON.parse(localStorage.getItem("saved_routes")) || [];

  $scope.addRoute = function() {
    $scope.my_routes.push(
      {
        "route_from": $scope.route_from,
        "route_to": $scope.route_to
      }
    )
    localStorage.setItem("my_routes", JSON.stringify($scope.my_routes));
    $scope.my_routes = JSON.parse(localStorage.getItem("my_routes"));
    $scope.updateRoutes();
  }

  $scope.updateRoutes = function() {
    if (localStorage.getItem("saved_routes")) {
      localStorage.getItem("saved_routes").clear;
      $scope.saved_routes = [];
    }
    angular.forEach($scope.my_routes, function(route, key) {
      var directionsService = new google.maps.DirectionsService();
      var directionsRequest = {
        origin: route.route_from,
        destination: route.route_to,
        travelMode: google.maps.DirectionsTravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        drivingOptions: {
          departureTime: new Date()
        },
      };
      directionsService.route(directionsRequest, function (response, status) {
        console.log(response.routes[0].legs[0]);
        if (status == google.maps.DirectionsStatus.OK) {
          $scope.saved_routes.push(
            {
              "start_address": response.routes[0].legs[0].start_address,
              "end_address": response.routes[0].legs[0].end_address,
              "duration": response.routes[0].legs[0].duration.text,
              "duration_in_traffic": response.routes[0].legs[0].duration_in_traffic.text,
              "duration_class": $scope.getTime(response.routes[0].legs[0].duration.value,response.routes[0].legs[0].duration_in_traffic.value)
            }
          )
          localStorage.setItem("saved_routes", JSON.stringify($scope.saved_routes));
          $scope.saved_routes = JSON.parse(localStorage.getItem("saved_routes"));
          $scope.$apply();
        }
      })
    });
  }

  $scope.getTime = function(duration,duration_in_traffic) {
    $scope.duration_class = "black";
    if (duration_in_traffic < duration) {
      $scope.duration_class = "green";
    } else {
      $scope.duration_class = "red";
    }
    return $scope.duration_class;
  }
}]);
