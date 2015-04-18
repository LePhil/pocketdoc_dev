'use strict';

/* App Module */

var pocketdocApp = angular.module('pocketdocApp', [
  "ngMaterial",
  "pocketdocControllers",
  "pocketdocFactories",
  "pocketdocBackend",
  "ngRoute",
  "ngCookies",
  "ngResource"
])
.config(['$routeProvider', '$locationProvider', '$httpProvider', '$mdThemingProvider',
	function($routeProvider, $locationProvider, $httpProvider, $mdThemingProvider) {

	    $httpProvider.defaults.useXDomain = true;
	    $httpProvider.defaults.withCredentials = true;
		delete $httpProvider.defaults.headers.common['X-Requested-With'];


		$routeProvider
		.when('/', {
			templateUrl: 'partials/Splash.html',
			controller: 'mainController'
		})
		.when('/run', {
			templateUrl: 'partials/Questions.html',
			controller: 'questionController'
		})
        .when('/diagnosis', {
            templateUrl: 'partials/Diagnosis.html',
            controller: 'diagnosisController'
        })
		.otherwise({
			redirectTo: '/'
		});
		
		$mdThemingProvider.theme('default')
			.accentPalette('green');
	}
]);