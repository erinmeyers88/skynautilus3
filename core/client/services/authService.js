angular.module("skyNautilus")
	.service("authService", function ($http) {
		
		
	this.authedUser = function () {
		return $http.get("/getautheduser").then(function (response) {
			return response.data;
		});
	};
		
	// this.checkLogin = function () {
	// 	return $http.get("/checklogin").then(function (response) {
	// 		return response.data;
	// 	});
	// };	
		
	});