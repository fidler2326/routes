myRoutes.controller("HomeController", ['$rootScope','$scope','$http','$timeout', function($rootScope,$scope,$http,$timeout) {
  $scope.route_from = null;
  $scope.route_to = null;
  $scope.my_routes = JSON.parse(localStorage.getItem("my_routes")) || [];
  $scope.saved_routes = JSON.parse(localStorage.getItem("saved_routes")) || [];
  $scope.id = localStorage.getItem("count") || localStorage.setItem("count",0);

  // Add route name
  // Set up directions

  $scope.toggleModal = function() {
    $scope.route_to = null;
    $scope.route_from = null;
    $scope.show_modal = !$scope.show_modal;
  }

  $scope.addRoute = function() {
    // Close the add route modal
    $scope.show_modal = false;
    // Update routes
    $scope.updateRoutes("add");
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

  $scope.updateRoutes = function(type) {
    $scope.show_loading = true;

    // Reset routes array
    $scope.routes = []

    // If a new route just add the new route to the routes array
    if (type == "add") {
      $scope.routes.push(
        {
          "route_from": $scope.route_from,
          "route_to": $scope.route_to
        }
      )
    } else {
      // If not adding a new route clear all saved routed (to be updated later)
      if (localStorage.getItem("saved_routes")) {
        localStorage.removeItem("saved_routes");
        $scope.saved_routes = [];
      }
      $scope.routes = $scope.my_routes;
    }

    angular.forEach($scope.routes, function(route, key) {
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
        if (status == "NOT_FOUND") {
          console.log("ERROR");
          $scope.error = {
            "title": "Route Not Found",
            "message": "Route not found! Try to be more specific - add ', UK' to the end of the address and check for spelling mistakes."
          };
          $scope.$apply();
          // Refresh save routes
          $scope.saved_routes = JSON.parse(localStorage.getItem("saved_routes"));
        } else {
          console.log("SUCCESS");
          $scope.show_loading = false;
          // If adding a new route add the new route to the my routes array and save to localStorage
          if (type == "add") {
            $scope.my_routes.push(
              {
                "route_from": $scope.route_from,
                "route_to": $scope.route_to
              }
            )
            localStorage.setItem("my_routes", JSON.stringify($scope.my_routes));
            $scope.my_routes = JSON.parse(localStorage.getItem("my_routes"));
          }

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