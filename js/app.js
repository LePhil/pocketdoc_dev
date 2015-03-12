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
			templateUrl: 'partials/main.html'
		})
		.otherwise({
			redirectTo: '/'
		});
	}
]);