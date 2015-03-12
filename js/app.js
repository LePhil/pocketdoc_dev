'use strict';

/* App Module */

var pocketdocApp = angular.module('pocketdocApp', [
  "ngMaterial",
  "pocketdocControllers",
  "ngRoute"
])
.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {
		$routeProvider
		.when('/run', {
			templateUrl: 'partials/run.html',
			controller: 'questionController'
		})
		.when('/', {
			templateUrl: 'partials/main.html',
			controller: 'mainController'
		})
		.otherwise({
			redirectTo: '/'
		});
	}
]).
factory("User", function() {
	var user = {
		name: "admin",
    	id: 3
	};
	return user; 
});