angular.module("skyNautilus")
	.config(function ($stateProvider, $urlRouterProvider) {
		
		$stateProvider
			.state("home", {
				url: "/home",
				templateUrl: "features/home/home.html",
				controller: "homeCtrl"
			})
		
			.state("searchresults", {
				url: "/searchresults",
				templateUrl: "features/searchResults/searchResults.html",
				controller: "searchResultsCtrl"
				// resolve: {
				// 	loadResults: function (flightSearchService) {
				// 		return flightSearchService.getSearchResultsFinal();
				// 	} 
				// }
			});
		
		$urlRouterProvider.otherwise("/home");
		
	});
	
	
