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
			console.log(this);
			if(!this.is_auth) {
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