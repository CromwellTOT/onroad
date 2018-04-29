app.factory("$us", ["$q", "$http", ds.$userservice]);
app.factory("$ts", ["$q", "$http", ds.$tripservice]);
app.factory("$bs", ["$q", "$http", ds.$blogservice]);
app.factory("$authService", ["localStorageService", "$us", "$rootScope", function($localStorage, $us, $rootScope) {
	return {
		is_auth: false,
		getUserName: function() {
			if(this.is_auth) {
				return $localStorage.get("username");
			} else {
				return ""
			}
		},
		getAuth: function() {
			return this.is_auth;
		},
		setAuthPair: function(auth_pair) {
			var username = auth_pair.username,
				password = auth_pair.password;

			$localStorage.set("username", username);
			$localStorage.set("password", password);
		},
		initAuthCheck: function(callback) {
			var that = this,
				username = $localStorage.get("username"),
				password = $localStorage.get("password");

			if(username && password) {
				var auth_pair = {
					username: username,
					password: password
				}
				$us.authUser(auth_pair).then(function(res) {
					that.is_auth = $.parseJSON(res.data);
					callback(that.is_auth);
				});
			} else {
				this.is_auth = false;
				callback(false);
			}
		},
		login: function(callback) {
			var that = this,
				username = $localStorage.get("username"),
				password = $localStorage.get("password");

			if(username && password) {
				var auth_pair = {
					username: username,
					password: password
				}
				$us.authUser(auth_pair).then(function(res) {
					is_auth = $.parseJSON(res.data);
					that.is_auth = is_auth;
					callback(is_auth);
				});
			} else {
				this.is_auth = false;
				callback(false);
			}
		},
		logout: function() {
			this.is_auth = false;
			$localStorage.set('username', '');
			$localStorage.set('password', '');;
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