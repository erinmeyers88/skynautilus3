angular.module("skyNautilus").service("flightSearchService", FlightSearchService);

function FlightSearchService($http, $state, $location) {



	var userInputObject = {};

	var finalSearchResults = {};



	///Search function////////////////////////////////////////////////////		
	
	
	function goToSearchResults() {
		console.log($location.path());
		if ($location.path() !== "/searchresults") {
			$state.go("searchresults");
			console.log("Changing states");
		} else {
			console.log("refreshing state");
			$state.go("searchresults", {}, { reload: true });
		}
	};

	function showHideLoadResultsModal() {
		var el = document.getElementById("loadModal");
		el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
    };


	this.search = function (userInput) {

		userInputObject = userInput;

		console.log("logging user input on service", userInput);

		showHideLoadResultsModal();

		var origins = ["PDX", "SLC", "LAX"],
			length = origins.length - 1,
			index = 0,
			searchResults = {
				tripType: userInput.tripType,
				originsAndDestintation: [],
				airports: [],
				airlines: [],
				flightListings: []
			};

		find(index);

		function find(index) {

			var requestBody = angular.toJson(buildRequestBody(origins[index], userInput));

			submitGoogleSearch(requestBody, userInput)
				.then(function (response) {
					console.log("Logging response:", response);
					addToResults(response);
					if (index < length) {
						index++;
						find(index);
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

		function addToResults(results) {			

			// Make filter list of cities //
			
			results.tripOptions.forEach(function (option1) {
				option1.slice.forEach(function (option2) {
					option2.segment.forEach(function (option3) {
						option3.leg.forEach(function (option4) {
							if (searchResults.originsAndDestintation.length === 0) {
								searchResults.originsAndDestintation.push(option4.origin);
								searchResults.originsAndDestintation.push(option4.destination);
							} else {
								if (searchResults.originsAndDestintation.indexOf(option4.origin) === -1) {
									searchResults.originsAndDestintation.push(option4.origin);
								}
								if (searchResults.originsAndDestintation.indexOf(option4.destination) === -1) {
									searchResults.originsAndDestintation.push(option4.destination);
								}
								else {
									return;
								}
							}
						});
					});
				});
			});



			//Change city names for filter
		

			for (var i = 0; i < searchResults.originsAndDestintation.length; i++) {
				
				if (typeof searchResults.originsAndDestintation[i] === "string") {
					searchResults.originsAndDestintation[i] = { airportCode: searchResults.originsAndDestintation[i] };
				for (var j = 0; j < results.header.airport.length; j++) {
					if (results.header.airport[j].code === searchResults.originsAndDestintation[i].airportCode) {
						searchResults.originsAndDestintation[i].cityCode = results.header.airport[j].city;
					}
				};
				for (var k = 0; k < results.header.city.length; k++) {
					if (results.header.city[k].code === searchResults.originsAndDestintation[i].cityCode) {
						searchResults.originsAndDestintation[i].cityName = results.header.city[k].name;
					}
				}
					
				}
				
				

			}

			//Change airline names
			
			
			results.tripOptions.forEach(function (option1) {
				option1.slice.forEach(function (option2) {
					option2.segment.forEach(function (option3) {
						for (var i = 0; i < results.header.carrier.length; i++) {
							if (results.header.carrier[i].code === option3.flight.carrier) {
								option3.flight.carrier = results.header.carrier[i].name;
							}
						}
					});
				});
			});

			results.tripOptions.forEach(function (option1) {
				option1.slice.forEach(function (option2) {
					option2.segment.forEach(function (option3) {
						option3.flight.carrier = option3.flight.carrier.replace(",", "");
						option3.flight.carrier = option3.flight.carrier.replace("Inc.", "");
						option3.flight.carrier = option3.flight.carrier.replace("Co.", "");
						option3.flight.carrier = option3.flight.carrier.replace("Ltd.", "");
					});
				});
			});


			
			
			
		
			// //airlines//
			
			// var airlineCodes = {
			// 	AS: "Alaska",
			// 	US: "US Air",
			// 	VX: "Virgin America",
			// 	B6: "Jet Blue",
			// 	UA: "United",
			// 	WS: "WestJet",
			// 	NK: "Spirit",
			// 	F9: "Frontier"
			// };

			// results.header.carrier.forEach(function (airline) {
			// 	airline.code = airline.code.replace(/AS|US|VX|B6|UA|WS|NK|F9/gi, function (code) {
			// 		return airlineCodes[code];
			// 	});
			// });

			searchResults.airlines = searchResults.airlines.concat(results.header.carrier);

			searchResults.airlines.forEach(function (airline) {
				airline.name = airline.name.replace(",", "");
				airline.name = airline.name.replace("Inc.", "");
			});

			searchResults.airports = searchResults.airports.concat(results.header.airport);
			
			//Itineraries//
			results.tripOptions.forEach(function (option1) {
				option1.saleTotal = option1.saleTotal.replace("USD", "");
				option1.saleTotal = Number(option1.saleTotal);
				delete option1.$$hashKey;
				delete option1.id;
				delete option1.kind;
				// delete option1.pricing;
				option1.pricing.forEach(function (priceobject) {
					delete priceobject.$$hashkey;
					delete priceobject.baseFareTotal;
					delete priceobject.fare;
					delete priceobject.fareCalculation;
					delete priceobject.kind;
					delete priceobject.latestTicketingTime;
					delete priceobject.passengers.kind;
					delete priceobject.ptc;
					delete priceobject.saleFareTotal;
					delete priceobject.saleTaxTotal;
					delete priceobject.saleTotal;
					delete priceobject.segmentPricing;
					delete priceobject.tax;
				});
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

						// option3.flight.carrier = option3.flight.carrier.replace(/AS|US|VX|B6|UA|WS|NK|F9/gi, function (code) {
						// 	return airlineCodes[code];
						// });
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


							searchResults.airports.forEach(function (airport) {
								if (option4.origin === airport.code) {
									searchResults.originsAndDestintation.forEach(function (city) {
										if (airport.city === city.cityCode) {
											option4.originName = city.cityName;
										}
									});
								}
								if (option4.destination === airport.code) {
									searchResults.originsAndDestintation.forEach(function (city) {
										if (airport.city === city.cityCode) {
											option4.destinationName = city.cityName;
										}
									});
								}
							});


						});
					});
				});
			});

			searchResults.flightListings = searchResults.flightListings.concat(results.tripOptions);
		}
	};

	this.getFinalSearchResults = function () {
		return finalSearchResults;
	};

	this.getUserInput = function () {
		return userInputObject;
	};
	
	
	// helper functions //
	
	
	//API KEYS///////////////////////////////////////////////////////////	
	//other key: AIzaSyAFSQP3ClWoPPShBYApLfxjazl-1WsKpu8
	//win key: AIzaSyCL0ZLFUF5_SsrocXX6ZKSaRlonngvd9cE
	//my key: AIzaSyAFEjs778GYWjvMrYyuzPLk5eLAqtqLfdA
	//daniel law key: AIzaSyAfUeKttBcaUk-jAIpc9jMURjQ8V0FCBEs
	
	
	//////HTTP POST request for flight info//////////////////////////////////
	function submitGoogleSearch(searchBody, userInput) {
		var endpoint = 'https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyCL0ZLFUF5_SsrocXX6ZKSaRlonngvd9cE';
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