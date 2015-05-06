'use strict';

/* App Module */

var pocketdocApp = angular.module('pocketdocApp', [
  "ngMaterial",
  "pocketdocControllers",
  "pocketdocFactories",
  "pocketdocBackend",
  "ngRoute",
  "ngCookies",
  "ngResource",
  "ngMessages",
  "pascalprecht.translate"
]).config(['$routeProvider', '$locationProvider', '$httpProvider', '$mdThemingProvider', '$translateProvider',
	function($routeProvider, $locationProvider, $httpProvider, $mdThemingProvider, $translateProvider) {

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
		.when('/registration', {
			templateUrl: 'partials/Registration.html',
			controller: 'registrationController'
		})
		.when('/profile', {
			templateUrl: 'partials/Registration.html',
			controller: 'registrationController'
		})
		.otherwise({
			redirectTo: '/'
		});
		
		$mdThemingProvider.theme('default').accentPalette('green');

		$translateProvider.translations('de', {
			main_startDiagnosis: 'Diagnose jetzt starten!',
			main_welcome: 'Willkommen!',
			header_account: "Account",
			header_login_email: "E-Mail",
			header_login_password: "Passwort",
			header_login: "Login",
			header_register: "Registrieren",
			header_close: "Schliessen",
			header_logout: "Logout",
			header_profile: "Profil",
			header_settings: "Einstellungen",
			header_back: "Zurück",
			diag_diagnosis: "Diagnosis",
			diag_action: "Handlungsempfehlung",
			diag_followup: "Follow-Up",
			diag_followup_notnow: "Lieber nicht",
			diag_followup_enterfollowup: "Follow-Up eintragen",
			run_diagnosis_found: "Diagnose gefunden",
			run_diagnosis_found_no: "Nein, weitere Fragen beantworten",
			run_diagnosis_found_yes: "Ja, Details einsehen"
		});
		$translateProvider.translations('en', {
			main_startDiagnosis: 'Start Diagnosis now!',
			main_welcome: 'Welcome!',
			header_account: "Account",
			header_login_email: "E-Mail",
			header_login_password: "Password",
			header_login: "Login",
			header_register: "Register",
			header_close: "Close",
			header_logout: "Logout",
			header_profile: "Profile",
			header_settings: "Settings",
			header_back: "Back",
			diag_diagnosis: "Diagnosis",
			diag_action: "Recommended Action",
			diag_followup: "Followup",
			diag_followup_notnow: "Not now",
			diag_followup_enterfollowup: "Yes, register followup",
			run_diagnosis_found: "Diagnosis found",
			run_diagnosis_found_no: "No, answer further questions",
			run_diagnosis_found_yes: "Yes, view details"
		});

		$translateProvider.preferredLanguage('de');
	}
]);