angular.module("skyNautilus")
	.service("authService", function ($http) {
		
		
	this.authedUser = function () {
		return $http.get("/getautheduser").then(function (response) {
			return response.data;
		});
	};
		
		
	});