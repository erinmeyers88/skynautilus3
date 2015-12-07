angular.module("skyNautilus").service("flightSearchService", FlightSearchService);

function FlightSearchService($http, $state) {

	var finalSearchResults = {};

	///Search function////////////////////////////////////////////////////		
	
	
	function goToSearchResults () {
			$state.go("searchresults");
			console.log("Changing states");
		};
		
	function showHideLoadResultsModal () {
      var el = document.getElementById("loadModal");
      el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
    };
  
	
	this.search = function (userInput) {
		
		showHideLoadResultsModal();

		var origins = ["PDX", "LAX", "SFO"],
			length = origins.length - 1,
			index = 0,
			searchResults = {
				tripType: userInput.tripType,
				cities: [],
				airlines: [],
				flightListings: []
			};
		
		find(index);
					
		function find (index) {
			
			var requestBody = angular.toJson(buildRequestBody(origins[index], userInput));
			
			submitGoogleSearch(requestBody, userInput)
				.then(function (response) {
					console.log("Logging response:", response);
					addToResults(response);
					if (index < length) {
						index++;
						find (index);							
					} else {
						finalSearchResults = searchResults;
						console.log("Search results:", searchResults);
						goToSearchResults();
						return searchResults;
					} 
				},
				function (err) {
					console.log(err);
				});			
		}
		
		function addToResults (results) {			

			// cities //
			searchResults.cities = searchResults.cities.concat(results.header.city);
			
			//airlines//
			
			var airlineCodes = {
				AS: "Alaska",
				US: "US Air",
				VX: "Virgin America",
				B6: "Jet Blue",
				UA: "United",
				WS: "WestJet",
				NK: "Spirit",
				F9: "Frontier"
			};
			
			results.header.carrier.forEach(function (airline) {
				airline.code = airline.code.replace(/AS|US|VX|B6|UA|WS|NK|F9/gi, function (code) {
					return airlineCodes[code];
				});
			});
			
			searchResults.airlines = searchResults.airlines.concat(results.header.carrier);
			

			
			//Itineraries//
			results.tripOptions.forEach(function (option1) {
				option1.saleTotal = option1.saleTotal.replace("USD", "$");
				delete option1.$$hashKey;
				delete option1.id;
				delete option1.kind;
				// delete option1.pricing;
				option1.slice.forEach(function (option2) {
					delete option2.kind;
					delete option2.duration;
					option2.segment.forEach(function (option3) {
						delete option3.$$hashKey;
						delete option3.bookingCode;
						delete option3.bookingCodeCount;
						delete option3.cabin;
						delete option3.connectionDuration;
						
						delete option3.id;
						delete option3.kind;
						delete option3.marriedSegmentGroup;
						
						var m = option3.duration % 60;
						var h = (option3.duration - m) / 60;
						option3.cleanDuration = h.toString() + ":" + (m < 10 ? "0" : "") + m.toString();
						
						delete option3.duration;
						
						option3.flight.carrier = option3.flight.carrier.replace(/AS|US|VX|B6|UA|WS|NK|F9/gi, function (code) {
							return airlineCodes[code];
						});
						option3.leg.forEach(function (option4) {
							delete option4.$$hashKey;
							delete option4.aircraft;
							
							delete option4.destinationTerminal;
							delete option4.meal;
							
							delete option4.id;
							delete option4.kind;
							delete option4.mileage;
							delete option4.onTimePerformance;
							delete option4.secure;
								
							option4.cleanDepartureTime = new Date(option4.departureTime);
							option4.cleanArrivalTime = new Date(option4.arrivalTime);
							var min = option4.duration % 60;
							var hour = (option4.duration - min) / 60;
							option4.cleanDuration = hour.toString() + ":" + (min < 10 ? "0" : "") + min.toString();
							
							delete option4.arrivalTime;
							delete option4.departureTime;
							delete option4.duration;
						});
					});
				});
			});
			
			searchResults.flightListings = searchResults.flightListings.concat(results.tripOptions);
	}				
	};	
	
	this.getFinalSearchResults = function () {
		return finalSearchResults
	};
	
	
	
	
	
	// helper functions //
	
	
	//API KEYS///////////////////////////////////////////////////////////	
	//other key: AIzaSyAFSQP3ClWoPPShBYApLfxjazl-1WsKpu8
	//win key: AIzaSyCL0ZLFUF5_SsrocXX6ZKSaRlonngvd9cE
	//my key: AIzaSyAFEjs778GYWjvMrYyuzPLk5eLAqtqLfdA
	//daniel law key: AIzaSyAfUeKttBcaUk-jAIpc9jMURjQ8V0FCBEs
	
	
	//////HTTP POST request for flight info//////////////////////////////////
	function submitGoogleSearch (searchBody, userInput) {
		var endpoint = 'https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyAFEjs778GYWjvMrYyuzPLk5eLAqtqLfdA'
		return $http.post(endpoint, searchBody).then(function (response) {
			return { header: response.data.trips.data, tripOptions: response.data.trips.tripOption };			
		});
	}
	
	function buildRequestBody(origin, userInput) {
		userInput.passengerCount = +userInput.passengerCount;
		
		var requestBody = {
			request: {
				passengers: {
					kind: "qpxexpress#passengerCounts",
					adultCount: userInput.passengerCount,
					childCount: 0,
					infantInLapCount: 0,
					infantInSeatCount: 0,
					seniorCount: 0
				},
				slice: [
					{
						kind: "qpxexpress#sliceInput",
						origin: origin,
						destination: userInput.destination,
						date: userInput.departureDate,
						maxStops: 10,
						maxConnectionDuration: 1440,
						preferredCabin: "",
						permittedDepartureTime: {
							kind: "qpxexpress#timeOfDayRange",
							earliestTime: "",
							latestTime: ""
						},
						permittedCarrier: [""],
						alliance: "",
						prohibitedCarrier: [""]
					}
				],
				maxPrice: "",
				saleCountry: "",
				refundable: "",
				solutions: 50
			}
		};
	
	if (userInput.tripType === "roundtrip") {
		requestBody.request.slice.push(
			{
				kind: "qpxexpress#sliceInput",
				origin: userInput.destination,
				destination: origin,
				date: userInput.returnDate,
				maxStops: 10,
				maxConnectionDuration: 1440,
				preferredCabin: "",
				permittedDepartureTime: {
					kind: "qpxexpress#timeOfDayRange",
					earliestTime: "",
					latestTime: ""
				},
				permittedCarrier: [""],
				alliance: "",
				prohibitedCarrier: [""]
			}
		);
	}
			
	return requestBody;
}

}