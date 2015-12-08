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
			})
			
			.state("mytrips", {
				url: "/mytrips",
				templateUrl: "features/tripsList/tripsList.html",
				controller: "tripsListCtrl"
			})
			
			.state("tripdetails", {
				url: "/mytrips/:tripName",
				templateUrl: "features/trip/trip.html",
				controller: "tripCtrl"
			});
		
		
		
		$urlRouterProvider.otherwise("/home");
		
	});
	
	
