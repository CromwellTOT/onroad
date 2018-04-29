var app = angular.module("mainApp", ["ngRoute", "LocalStorageModule"]);

app.controller("mainCtrl", ["$scope", "$authService", "$location", function($scope, $as, $location) {
	$location.path("home");
	$scope.$watch('is_auth', function(newVal) {
		$scope.authText = (newVal) ? "Log out" : "Log in";
		$scope.toggle = newVal;
	})
	
	$as.initAuthCheck(function(is_auth) {
		$scope.is_auth = is_auth;
	})
	$scope.$on("OnAuthChange", function(evt, val) {
		$scope.is_auth = val;
		$scope.$broadcast("updateAuth", val);
	});
	$scope.logAccount = function() {
		if($scope.is_auth) {
			// log out
			$as.logout();
			$scope.is_auth = false;
			$location.path("home");
		} else {
			// log in
			$location.path("login");
		}
	}
	//$us.setAuthPair({ username: "Cromwell", password: "zztsky123" });
}]);

app.config(["$routeProvider", function($routeProvider) {
	$routeProvider.when("/home", {
		templateUrl: "template/home.html",
		controller: "homeCtrl"
	}).when("/trips", {
		templateUrl: "template/Trips.html",
		controller: "tripCtrl"
	}).when("/blogs", {
		templateUrl: "template/Blogs.html",
		controller: "blogCtrl"
	}).when("/contact", {
		templateUrl: "template/Contact.html",
		controller: "contactCtrl"
	}).when("/myAccount", {
		templateUrl: "template/MyAccount.html",
		controller: "myAccountCtrl"
	}).when("/login", {
		templateUrl: "template/Login.html",
		controller: "loginCtrl"
	}).when("/register", {
		templateUrl: "template/Register.html",
		controller: "registerCtrl"
	}).otherwise({
		redirectTo: "home"
	})
}]);

app.controller("homeCtrl", ["$scope", "$ts", "$authService", function($scope, $ts, $as) {
	$scope.c = 0;	

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

app.controller("blogCtrl", ["$scope", "$bs", function($scope, $blogService) {
	$scope.blog = {};
	$scope.c = 0;
	$blogService.getAllBlogs().then(function(blogs) {
		$scope.blogList = blogs;
		$scope.currentBlog = blogs[$scope.c];
	});
	$scope.doSubmit = function() {
		if($scope.blog.title && $scope.blog.content && $scope.blog.imageUrl) {
			$blogService.createBlog($scope.blog).then(function(res) {
				console.log(res);
				alert("Success: New blog created!");
			});
		} else {
			alert("Error: Some required fields are empty!");
		}		
	};
	$scope.goPrevious = function() {
		$scope.c--;
		$scope.currentBlog = $scope.blogList[$scope.c];
	};
	$scope.goNext = function() {
		$scope.c++;
		$scope.currentBlog = $scope.blogList[$scope.c];
	};
}]);

app.controller("contactCtrl", ["$scope", function($scope) {

}]);

app.controller("myAccountCtrl", ["$scope", function($scope) {
	$scope.logout = function() {
		var is_auth = false;
		$scope.$emit("onAuth", is_auth);
	}
}]);

app.controller("registerCtrl", ["$scope", "$us", function($scope, $userService) {
	$scope.removeAlert = function() {
		$scope.is_alert = undefined;
	};
	$scope.user = {};
	$scope.register = function() {
		var info = $scope.user;
		if(info.password.length > 6 && info.number.length == 10) {
			$userService.createUser($scope.user).then(function() {
				//console.log('success');
				$scope.alert = "Register Success";
				$scope.is_alert = true;
			})
		} else {
			$scope.alert = "Invalid input";
			$scope.is_alert = true;
		}
	}
}]);

app.controller("loginCtrl", ["$scope", "$authService", "$location", function($scope, $as, $location) {
	$scope.auth_pair = {};

	$scope.removeAlert = function() {
		$scope.is_alert = undefined;
	};

	$scope.doSubmit = function() {
		$as.setAuthPair($scope.auth_pair);
		$as.login(function(is_auth) {
			if(is_auth) {
				$scope.is_auth = is_auth;
				$location.path("myAccount");
			} else {
				$scope.auth_pair = {};
				$scope.alert = "Wrong auth pair";
				$scope.is_alert = true;
			}
		});
		$scope.$watch("is_auth", function(newVal) {
			$scope.$emit("OnAuthChange", newVal);
		});
	};
}]);





