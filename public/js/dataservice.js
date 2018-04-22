(function(global) {
	var ds = {};
	ds.$userservice = function($q, $http) {
		return {
			authUser: function(auth_pair) {
				var defer = $q.defer();
				$http.post("/rest/user/auth", auth_pair).then(function(resp) {
					defer.resolve(resp);
				});
				return defer.promise;
			},
			createUser: function(user) {
				var defer = $q.defer();
				$http.post("/rest/user", user).then(function(resp) {
					defer.resolve(resp);
				});
				return defer.promise;
			},
			getOneUser: function(name) {
				var defer = $q.defer();
				$http.get("/rest/user/" + name).then(function(resp) {
					defer.resolve(resp.data);
				});
				return defer.promise;
			},
			updateUser: function(user) {
				var defer = $q.defer();
				$http.put("/rest/user", user).then(function(resp) {
					defer.resolve(resp);
				});
				return defer.promise;
			},
			deleteByName: function(name) {
				var defer = $q.defer();
				$http.delete("/rest/user/" + name).then(function(resp) {
					defer.resolve(resp);
				});
				return defer.promise;
			}
		}
	};
	ds.$tripservice = function($q, $http) {
		return {
			getAllTrips: function() {
				var defer = $q.defer();
				$http.get("/rest/trip").then(function(resp) {
					defer.resolve(resp.data);
				});
				return defer.promise;
			},
			createTrip: function(trip) {
				var defer = $q.defer();
				$http.post("/rest/trip", trip).then(function(resp) {
					defer.resolve(resp);
				});
				return defer.promise;
			},
			getTrips: function(key, value) {
				var defer = $q.defer();
				$http.get("/rest/trip/" + key + '/' + value).then(function(resp) {
					defer.resolve(resp.data);
				});
				return defer.promise;
			},
			updateTrip: function(trip) {
				var defer = $q.defer();
				$http.put("/rest/trip", trip).then(function(resp) {
					defer.resolve(resp);
				});
				return defer.promise;
			},
			deleteById: function(id) {
				var defer = $q.defer();
				$http.delete("/rest/trip/" + id).then(function(resp) {
					defer.resolve(resp);
				});
				return defer.promise;
			}
		}
	};
	ds.noConflict = function() {
		return ds;
	}
	global.ds = ds;
})(window);