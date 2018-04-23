var app = angular.module("mainApp", ["ngRoute", "LocalStorageModule"]);

app.controller("mainCtrl", ["$scope", "$authService", function($scope, $as) {
	$as.getAuth(function(is_auth) {
		if(is_auth) {
			$scope.account_location = 'myAccount';
		} else {
			$scope.account_location ='loginAccount';
		}
	});
	//$us.setAuthPair({ username: "Cromwell", password: "zztsky123" });
	//console.log(this);
}]);

app.factory("$us", ["$q", "$http", ds.$userservice]);
app.factory("$ts", ["$q", "$http", ds.$tripservice]);
app.factory("$authService", ["localStorageService", "$us", function($localStorage, $us) {
	return {
		is_auth: undefined,
		logOut: function() {
			$localStorage.delete("username");
			$localStorage.delete("password");
			this.is_auth = undefined;
		},
		setAuthPair: function(auth_pair) {
			var username = auth_pair.username,
				password = auth_pair.password;

			$localStorage.set("username", username);
			$localStorage.set("password", password);
		},
		getAuth: function(callback) {
			if(this.is_auth != undefined) {
				callback(is_auth);
			}
			
			var is_auth = false;
			var	username = $localStorage.get("username");
			var	password = $localStorage.get("password");

			if(username && password) {
				var auth_pair = {
					username: username,
					password: password
				}
				$us.authUser(auth_pair).then(function(res) {
					is_auth = $.parseJSON(res.data);
					this.is_auth = is_auth;
					callback(is_auth);
				});
			} else {
				this.is_auth = is_auth;
				callback(is_auth);
			}
		}
	};
}]);

app.directive('focusOn', function() {
   return function(scope, elem, attr) {
      scope.$on(attr.focusOn, function(e) {
          elem[0].focus();
      });
   };
});

app.config(["$routeProvider", function($routeProvider) {
	$routeProvider.when("/home", {
		templateUrl: "template/home.html",
		controller: "homeCtrl"
	}).when("/allTrips", {
		templateUrl: "template/allTrips.html",
		controller: "tripCtrl"
	}).when("/myAccount", {
		templateUrl: "template/MyAccount.html",
		controller: "myAccountCtrl"
	}).when("/createAccount", {
		templateUrl: "template/CreateAccount.html",
		controller: "createAccountCtrl"
	}).when("/loginAccount", {
		templateUrl: "template/LoginAccount.html",
		controller: "loginAccountCtrl"
	}).otherwise({
		redirectTo: "home"
	})
}]);

app.controller("homeCtrl", ["$scope", "$ts", "$authService", function($scope, $ts, $as) {
	$scope.c = 0;
	$as.getAuth(function(is_auth) {
		$scope.is_auth = is_auth;
		if(is_auth) {
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

app.controller("myAccountCtrl", ["$scope", function($scope) {

}]);

app.controller("createAccountCtrl", ["$scope", function($scope) {

}]);

app.controller("loginAccountCtrl", ["$scope", "$authService", "$location", function($scope, $as, $location) {
	$scope.auth_pair = {};

	$scope.removeAlert = function() {
		console.log("lalal");
		$scope.alert = "";
	};

	$scope.doSubmit = function() {
		$as.setAuthPair($scope.auth_pair);
		$as.getAuth(function(is_auth) {
			if(is_auth) {
				$location.path("myAccount");
			} else {
				$scope.auth_pair = {};
				$scope.alert = "Wrong auth pair";
			}
		});
	};
}]);





