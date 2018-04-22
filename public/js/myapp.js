var app = angular.module("mainApp", ["ngRoute", "LocalStorageModule"]);

app.controller("mainCtrl", ["$scope", "$UserService", function($scope, $us) {
	//$us.setAuthPair({ username: "Cromwell", password: "zztsky123" });
	//console.log(this);
}]);

app.factory("$us", ["$q", "$http", ds.$userservice]);
app.factory("$ts", ["$q", "$http", ds.$tripservice]);
app.factory("$UserService", ["localStorageService", "$us", function($localStorage, $us) {
	return {
		getUserName: function() {
			return $localStorage.get("username");
		},
		setAuthPair: function(auth_pair) {
			var username = auth_pair.username,
				password = auth_pair.password;

			$localStorage.set("username", username);
			$localStorage.set("password", password);
		},
		getAuth: function(callback) {
			var is_auth = false,
				username = $localStorage.get("username"),
				password = $localStorage.get("password");

			if(username && password) {
				var auth_pair = {
					username: username,
					password: password
				}
				$us.authUser(auth_pair).then(function(res) {
					callback(res.data);
				});
			} else {
				callback("false");
			}
		}
	};
}]);

app.config(["$routeProvider", function($routeProvider) {
	$routeProvider.when("/home", {
		templateUrl: "template/home.html",
		controller: "homeCtrl"
	}).when("/allTrips", {
		templateUrl: "template/allTrips.html",
		controller: "tripCtrl"
	}).when("/account", {
		templateUrl: "template/account.html",
		controller: "accountCtrl"
	}).otherwise({
		redirectTo: "home"
	})
}]);

app.controller("homeCtrl", ["$scope", "$ts", "$UserService", function($scope, $ts, $us) {
	$scope.c = 0;
	$us.getAuth(function(is_auth) {
		$scope.is_auth = $.parseJSON(is_auth);
		if(is_auth == "true") {
			$scope.comment_placeholder = 'Enter you message..';
		} else {
			$scope.comment_placeholder = 'Login to comment..';
		}
	});	

	$scope.doClear = function() {
		$scope.trip = {};
	};
	$scope.doSubmit = function() {
		$ts.getTrips("departure", $scope.trip.search_departure).then(function(data) {
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

app.controller("tripCtrl", ["$scope", "$ts", function($scope, $ts) {
	$ts.getAllTrips().then(function success(data) {
		$scope.trips = data;
	});
}]);

app.controller("accountCtrl", ["$scope", "$UserService", function($scope, $us) {
	$us.getAuth(function(is_auth) {
		$scope.is_auth = is_auth;
	})
}]);




