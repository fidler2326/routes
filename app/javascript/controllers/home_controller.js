myRoutes.controller("HomeController", ['$scope', '$http', function($scope, $http) {
  $scope.route_from = null;
  $scope.route_to = null;
  $scope.my_routes = JSON.parse(localStorage.getItem("my_routes")) || [];
  $scope.saved_routes = JSON.parse(localStorage.getItem("saved_routes")) || [];
  $scope.id = localStorage.getItem("count") || localStorage.setItem("count",0);
  $scope.route = {};

  $scope.toggleModal = function() {
    $scope.show_modal = !$scope.show_modal;
  }

  $scope.addRoute = function() {
    // Close the add route modal
    $scope.show_modal = false;
    // Update the localStorage count number
    localStorage.setItem("count",parseInt(localStorage.getItem("count"))+1);
    // Get the new localStorage count number for the new routes id
    $scope.id = parseInt(localStorage.getItem("count"));
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

  $scope.deleteRoute = function(id) {
    // Get routes array from localStorage
    $scope.my_routes = JSON.parse(localStorage.getItem("my_routes"));
    // Remove selected route from array
    $scope.my_routes.splice(id,1);
    // Resave the array to localStorage
    localStorage.setItem("my_routes", JSON.stringify($scope.my_routes));
    // Reset variable
    $scope.my_routes = JSON.parse(localStorage.getItem("my_routes"));
    // Refresh list of routes
    $scope.updateRoutes();
  }

  $scope.updateRoutes = function() {
    $scope.show_loading = true;
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
        $scope.show_loading = false;
        console.log(response.routes[0].legs[0]);
        if (status == google.maps.DirectionsStatus.OK) {
          $scope.saved_routes.push(
            {
              "id": route.id,
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