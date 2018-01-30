var mainApp=angular.module("mainApp",["ngRoute"]);(mainApp=angular.module("mainApp",["ngRoute"])).config(["$locationProvider","$routeProvider",function(e,t){t.when("/home",{templateUrl:"/app/templates/home/home.html",controller:"HomeController"}).when("/about",{templateUrl:"/app/templates/about/about.html",controller:"AboutController"}).otherwise({redirectTo:"/",templateUrl:"/app/templates/home/home.html",controller:"HomeController"}),e.html5Mode({enabled:!0,requireBase:!1})}]),mainApp.controller("AboutController",["$scope","$http",function(e,t){AboutController.$inject=["$scope"],console.log("AboutController")}]),mainApp.controller("HomeController",["$scope","$http",function(e,t){console.log("HomeController"),e.route_from=null,e.route_to=null,e.my_routes=JSON.parse(localStorage.getItem("my_routes"))||[],e.saved_routes=JSON.parse(localStorage.getItem("saved_routes"))||[],e.addRoute=function(){e.my_routes.push({route_from:e.route_from,route_to:e.route_to}),localStorage.setItem("my_routes",JSON.stringify(e.my_routes)),e.my_routes=JSON.parse(localStorage.getItem("my_routes")),e.updateRoutes()},e.updateRoutes=function(){localStorage.getItem("saved_routes")&&(localStorage.getItem("saved_routes").clear,e.saved_routes=[]),angular.forEach(e.my_routes,function(t,o){var r=new google.maps.DirectionsService,a={origin:t.route_from,destination:t.route_to,travelMode:google.maps.DirectionsTravelMode.DRIVING,unitSystem:google.maps.UnitSystem.METRIC,drivingOptions:{departureTime:new Date}};r.route(a,function(t,o){console.log(t.routes[0].legs[0]),o==google.maps.DirectionsStatus.OK&&(e.saved_routes.push({start_address:t.routes[0].legs[0].start_address,end_address:t.routes[0].legs[0].end_address,duration:t.routes[0].legs[0].duration.text,duration_in_traffic:t.routes[0].legs[0].duration_in_traffic.text,duration_class:e.getTime(t.routes[0].legs[0].duration.value,t.routes[0].legs[0].duration_in_traffic.value)}),localStorage.setItem("saved_routes",JSON.stringify(e.saved_routes)),e.saved_routes=JSON.parse(localStorage.getItem("saved_routes")),e.$apply())})})},e.getTime=function(t,o){return e.duration_class="black",e.duration_class=o<t?"green":"red",e.duration_class}}]),angular.module("mainApp").directive("routeCard",function(){return{restrict:"E",templateUrl:"../app/templates/home/_route_card.html",scope:!1,controller:["$scope",function(e){}],replace:!0}}).directive("newRouteForm",function(){return{restrict:"E",templateUrl:"../app/templates/home/_form.html",scope:!1,controller:["$scope",function(e){}],replace:!0}}),angular.module("mainApp").filter("empty",function(){return function(e){try{if(void 0===e||null===e)return!0;if("number"==typeof e||"boolean"==typeof e)return!1;if(void 0!==e.length)return 0==e.length;var t=0;for(var o in e)e.hasOwnProperty(o)&&t++;return 0==t}catch(e){}return!1}});