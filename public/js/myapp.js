var app = angular.module("mainApp", ["ngRoute"]);

app.controller("mainCtrl", ["$scope", function($scope){
	//console.log(this);
}]);

app.factory("$us", ["$q", "$http", ds.$userservice]);
app.factory("$ts", ["$q", "$http", ds.$tripservice]);

app.config(["$routeProvider", function($routeProvider) {
	$routeProvider.when("/home", {
		templateUrl: "template/home.html",
		controller: "homeCtrl"
	}).when("/allTrips", {
		templateUrl: "template/allTrips.html",
		controller: "tripCtrl"
	}).when("/myAccount", {
		templateUrl: "template/myAccount.html",
		controller: "accountCtrl"
	}).otherwise({
		redirectTo: "home"
	})
}]);

app.controller("homeCtrl", ["$scope", "$ts", "$location", function($scope, $ts, $location) {
	$scope.c = 0;
	$scope.doClear = function() {
		$scope.trip = {};
	};
	$scope.doSubmit = function() {
		$ts.getTrips("departure", $scope.trip.departure).then(function(data) {
			$scope.tripList = data;
			$scope.currentTrip = $scope.tripList[$scope.c];
		});
	};
	$scope.goPrevious = function() {
		$scope.c--;
		$scope.currentTrip = $scope.tripList[$scope.c];
	};
	$scope.goNext = function() {
		$scope.c++;
		$scope.currentTrip = $scope.tripList[$scope.c];
	};
}]);

app.controller("tripCtrl", ["$scope", "$ts", "$location", function($scope, $ts, $location) {
	$ts.getAllTrips().then(function success(data) {
		$scope.trips = data;
	})
}]);

app.controller("accountCtrl", ["$scope", "$us", "$location", function($scope, $es, $location) {
	
}]);