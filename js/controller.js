(function(){

	var pocketdocControllers = angular.module('pocketdocControllers', ['pocketdocBackend', 'pocketdocServices']);

	pocketdocControllers.controller('questionController',
		['$scope', '$location', 'RunService', 'DiagnosisData', '$mdDialog',
		function( $scope, $location, RunService, DiagnosisData, $mdDialog ) {

            $scope.loading = true;
			$scope.hidden = true;
			
			RunService.startRun(
				"",
				function(questionData){
					// Success
					console.log(questionData);
					$scope.currentQuestion = questionData;
					$scope.answeredQuestions = [];
                    $scope.loading = false;
					$scope.hidden = false;
				},
				function(error){
					alert(error);
				}
			);
			
			$scope.answerQuestion = function(givenAnswer){
                $scope.loading = true;
				$scope.hidden = true;
				
				alert("answer question!");
				console.log("Given answer:", givenAnswer);
				RunService.answerQuestion(
					{
						answerId : givenAnswer.id
					},
					function(questionData){
						// Success
						// Vorherige Frage in die Liste einfügen
						alert("Question Answered!");
						$scope.answeredQuestions.push(
							{
								question: $scope.currentQuestion,
								answer: givenAnswer
							}
						);
						
						// Show new question
						$scope.currentQuestion = questionData;
						$scope.givenAnswer = undefined;
						$scope.loading = false;
						
						if ($scope.currentQuestion.type == 3) {
							$scope.givenAnswer = 1;
                        }
						
                        // If diagnosis exists, show it
						if (typeof(questionData.diagnosis) !== "undefined") {
							$scope.showDiagnosis(questionData.diagnosis, questionData.action_suggestion);
						} else {
                            $scope.showNewQuestion();
                        }
					},
					function(error){
						alert(error);
					}
				);
			};
			
			$scope.showDiagnosis = function(diagnosis, actionSuggestion) {
                var confirm = $mdDialog.confirm()
                .title('Diagnose Gefunden')
                .content( diagnosis.description )
                .ariaLabel('Lucky day')
                .ok('Ja, Details einsehen')
                .cancel('Nein, weitere Fragen beantworten.')
                .clickOutsideToClose(false);

                $mdDialog.show(confirm).then(
                    function() {
						alert("Diagnosis show!");
                        RunService.acceptDiagnosis(
                            undefined,
                            function(){
                                $location.url("/diagnosis");
                                DiagnosisData.diagnosis = diagnosis;
                                DiagnosisData.actionSuggestion = actionSuggestion;
                            },
                            function(error){
                                alert(error);
                            }
                        );
                        
                    },
                    function() {
                        $scope.showNewQuestion();
                        console.log( "No, continue" );
                    }
                );
			};

            $scope.showNewQuestion = function() {
				$scope.loading = false;
                $scope.hidden = false;
            };

		}
	]);
	
	pocketdocControllers.controller('diagnosisController', ['$scope','DiagnosisData', function($scope, DiagnosisData){
		
		$scope.diagnosis = DiagnosisData.diagnosis;
		$scope.actionSuggestion = DiagnosisData.actionSuggestion;
		
	}]);
	
	pocketdocControllers.controller('mainController', [ '$scope', '$location', '$http', '$translate', function( $scope, $location, $http, $translate ) {

        $scope.run = function() {
		  $location.url('/run');
		};
	} ]);

    pocketdocControllers.controller('HeaderController', ['$scope', '$mdDialog', '$timeout', '$mdSidenav', '$log', '$translate',
                                                function( $scope, $mdDialog, $timeout, $mdSidenav, $log, $translate ) {
        $scope.languageBarOpen = false;
        $scope.language = "de";
        
        $scope.openLanguageBar = function() {
			alert("language")
            $scope.languageBarOpen = !$scope.languageBarOpen;
        };
        $scope.changeLanguage = function( lang ) {
			alert("language set");
            $scope.languageBarOpen = false;
            $scope.language = lang;
            $translate.use( lang ).then(function (lang) {
                console.log("Sprache zu " + lang + " gewechselt.");
            }, function ( lang ) {
                console.log("Irgendwas lief schief.");
            });
        };

        $scope.toggleRight = buildToggler('right');
        /**
         * Build handler to open/close a SideNav; when animation finishes
         * report completion in console
         */
        function buildToggler(navID) {
            return function() {
                return $mdSidenav(navID).toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            }
        }

        $scope.close = function () {
            $mdSidenav('right').close()
            .then(function () {
                $log.debug("close RIGHT is done");
            });
        };

        $scope.profile = function() {
            $scope.notImplementedYet("Profil");
        }
        $scope.logout = function() {
            $scope.notImplementedYet("Logout");
        }
        $scope.login = function() {
            $scope.notImplementedYet("Login");
        }
        $scope.register = function() {
            $scope.notImplementedYet("Registrieren");
        }

        $scope.notImplementedYet = function( functionality ) {
            $mdDialog.show(
                $mdDialog.alert()
                    .title('Noch nicht implementiert')
                    .content('Die Funktion "' + functionality + '" wurde noch nicht implementiert.' )
                    .ariaLabel('Noch nicht implementiert')
                    .ok('OK')
            );
        };
    }]);
})();
