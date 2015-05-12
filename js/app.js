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
			main_welcomeBack: "Willkommen",
			main_intro_salutation: "Liebe Testuserin, lieber Testuser",
			main_intro_short: "PocketDok ist ein neuartiges, elektronisches Patienten-Empowerment Programm. Es hilft erkrankten Menschen über einen natürlichen Dialog eine erste Diagnose zu erhalten und gibt ihnen eine Entscheidungsgrundlage für die weitere Behandlung. PocketDok empfiehlt Hausmittel, erkundigt sich nach dem Verlauf der Krankheit oder rät bei Bedarf zum Aufsuchen eines Arztes. PocketDok kann als mobile App und Website betrieben oder in eine bestehende Anwendung integriert werden.",
			main_intro_tutorial_header: "Anleitung Prototyp",
			main_intro_tutorial: "Sie sehen hier einen einfachen Prototyp von PocketDok. Dieser diagnostiziert zurzeit 43 Krankheiten, indem er Ihnen Fragen stellt, die Sie einfach nur mit ja oder nein beantworten müssen. Die Fragen müssen natürlich \"richtig\" beantwortet werden, damit PocketDok die Krankheit auch herausfinden kann. Das heisst, Sie sollten die Symptome der Krankheit, die Sie testen wollen, wirklich gut kennen und die Fragen entsprechend beantworten, wenn Sie ein richtiges Resultat erhalten möchten. Der PocketDok-Prototyp funktioniert mit Karteikärtchen. Diese werden in zwei Spalten angezeigt. In der linken Spalte erscheinen die Kärtchen mit den Fragen. Klicken Sie hier in das zutreffende Kästchen und die nächste Frage wird angezeigt. Bitte lassen Sie sich genug Zeit beim Antworten, da Sie keine Korrekturen vornehmen können. Wenn Sie einmal versehentlich falsch geantwortet haben, müssen Sie wieder von vorne beginnen. Wenn Sie in die rechte Spalte klicken, werden drei Kärtchen mit möglichen Diagnosen angezeigt. Manchmal ist es so, dass PocketDok bereits nach zehn Fragen die richtige Diagnose kennt, manchmal werden die Fragen, welche zur korrekten Diagnose führen aber erst ganz zum Schluss gestellt. Um sicher zu gehen, dass PocketDok genügend Informationen für eine korrekte Diagnose gesammelt hat, sollten Sie alle Fragen durchgehen und beantworten. Dieses Vorgehen ist natürlich nicht so effizient - aber eben: dies ist ein Prototyp. Das fertige Produkt wird selbständig erkennen, wann eine Diagnose gefunden worden ist und die Fragerunde beendet werden kann.",
			main_intro_tryNow: "Probieren Sie's aus!",
			main_followUp_open: "Ausstehende FollowUps",
			main_openRuns: "Offene Durchgänge",
			main_openRuns_delete: "Löschen",
			main_openRuns_start: "Starten",
			main_noneYet: "Noch keine!",
			main_followUp_delete: "Löschen",
			main_followUp_start: "Starten",
			main_followUp_remaining: "Bereit in ", 
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
			diag_followUp_done: "FollowUp abgeschlossen",
			diag_followUp_sameDiag: "Die Diagnose ist unverändert",
			diag_followUp_diffDiag: "Die Diagnose hat sich verändert",
			diag_followUp_desc: "Sie können zu einem späterem Zeitpunkt ein Follow-Up zu dieser Diagnose durchführen. Dadurch können Sie mit einem weiteren Durchlauf die Diagnose bestätigen.",
			diag_followup: "Follow-Up",
			diag_followup_notnow: "Lieber nicht",
			diag_followup_enterfollowup: "Follow-Up eintragen",
			diag_followup_register: "Registrieren",
			diag_followup_onlyForUsers: "Diese Funktion steht nur für eingeloggte User zur Verfügung.",
			run_diagnosis_found: "Diagnose gefunden",
			run_diagnosis_found_no: "Nein, weitere Fragen beantworten",
			run_diagnosis_found_yes: "Ja, Details einsehen",
			reg_profile: "Profil",
			reg_email: "E-Mail",
			reg_mandatory: "Pflichtfeld",
			reg_alreadyRegistered: "Adresse wurde bereits registriert.",
			reg_password: "Passwort",
			reg_password_new: "Neues Passwort",
			reg_password_current: "Aktuelles Passwort",
			reg_personalInformation: "Persönliche Angaben",
			reg_name: "Name",
			reg_sex: "Geschlecht",
			reg_sex_male: "Männlich",
			reg_sex_female: "Weiblich",
			reg_ageRange: "Altersbereich",
			reg_defaultValueSelect: "Bitte auswählen",
			reg_settings: "Einstellungen",
			reg_language: "Sprache",
			reg_history: "History ansehen",
			reg_deleteProfile: "Profil löschen",
			reg_cancel: "Abbrechen",
			reg_register: "Registrieren",
			reg_back: "Zurück",
			reg_save: "Speichern",
			header_reset: "Reset",
			header_forgotPassword: "Passwort vergessen?"
		});
		$translateProvider.translations('en', {
			main_startDiagnosis: 'Start Diagnosis now!',
			main_welcome: 'Welcome!',
			main_welcomeBack: "Welcome",
			main_intro_salutation: "Dear test user",
			main_intro_short: "PocketDoc is a new, electronic patient empowerment application. It helps sick people through a natural dialogue to find a first diagnosis and provides suggestions for further actions.",
			main_intro_tutorial_header: "How it works",
			main_intro_tutorial: "Press Start below or register, then start a diagnosis. You'll answer some questions regarding your situation and soon PocketDoc will have a diagnosis for you.",
			main_intro_tryNow: "Try it out now!",
			main_followUp_open: "Available follow up checks",
			main_openRuns: "Unfinished runs",
			main_openRuns_delete: "Delete",
			main_openRuns_start: "Start",
			main_noneYet: "Not yet!",
			main_followUp_delete: "Delete",
			main_followUp_start: "Start",
			main_followUp_remaining: "Ready in ", 
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
			diag_followUp_done: "FollowUp complete",
			diag_followUp_sameDiag: "The diagnosis remains unchanged",
			diag_followUp_diffDiag: "The diagnosis has changed",
			diag_followUp_desc: "You can participate in a follow-up check at a later time. This way, the diagnosis can be confirmed in another run.",
			diag_followup: "Followup",
			diag_followup_notnow: "Not now",
			diag_followup_enterfollowup: "Yes, register followup",
			diag_followup_register: "Register",
			diag_followup_onlyForUsers: "This function is only available for logged in users",
			run_diagnosis_found: "Diagnosis found",
			run_diagnosis_found_no: "No, answer further questions",
			run_diagnosis_found_yes: "Yes, view details",
			reg_profile: "Profile",
			reg_email: "E-Mail",
			reg_mandatory: "Mandatory",
			reg_alreadyRegistered: "This adress is already registered",
			reg_password: "Password",
			reg_password_new: "New password",
			reg_password_current: "Current password",
			reg_personalInformation: "Personal Information",
			reg_name: "Name",
			reg_sex: "Gender",
			reg_sex_male: "Male",
			reg_sex_female: "Female",
			reg_ageRange: "Age Range",
			reg_defaultValueSelect: "Please choose...",
			reg_settings: "Settings",
			reg_language: "Language",
			reg_history: "History",
			reg_deleteProfile: "Delete Profile",
			reg_cancel: "Cancel",
			reg_register: "Register",
			reg_back: "Back",
			reg_save: "Save",
			header_reset: "Reset",
			header_forgotPassword: "Forgot Password?"
		});

		$translateProvider.preferredLanguage('de');
	}
]);

pocketdocApp.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});
