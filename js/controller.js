(function(){

	var pocketdocControllers = angular.module('pocketdocControllers', ['pocketdocBackend', 'pocketdocServices']);

	pocketdocControllers.controller('questionController',
		['$scope', '$location', 'RunService', 'DiagnosisData', '$mdDialog',
		function( $scope, $location, RunService, DiagnosisData, $mdDialog ) {

			$scope.loading = true;
			
			RunService.startRun(
				"",
				function(questionData){
					// Success
					console.log(questionData);
					$scope.currentQuestion = questionData;
					$scope.answeredQuestions = [];
					$scope.loading = false;
				},
				function(error){
					alert(error);
				}
			);
			
			$scope.answerQuestion = function(givenAnswer){
				
				$scope.loading = true;
				console.log(givenAnswer);
				RunService.answerQuestion(
					{
							answerId : givenAnswer.id
					},
					function(questionData){
						// Success
						// Vorherige Frage in die Liste einfügen
						$scope.answeredQuestions.push(
							{
								question: $scope.currentQuestion,
								answer: givenAnswer
							}
						);
						
						console.log($scope.answeredQuestions);
						
						// Neue Frage anzeigen
						$scope.currentQuestion = questionData;
						$scope.givenAnswer = undefined;
						$scope.loading = false;
						
						if ($scope.currentQuestion.type == 3)
							$scope.givenAnswer = 1;
						
						if (typeof(questionData.diagnosis) !== "undefined")
						{
							$scope.showDiagnosis(questionData.diagnosis, questionData.action_suggestion);
						}
					}, 
					function(error){
						alert(error);
					}
				);
			};
			
			$scope.showDiagnosis = function(diagnosis, actionSuggestion){
				
				var confirm = $mdDialog.confirm()
                .title('Diagnose Gefunden')
                .content( diagnosis.description )
                .ariaLabel('Lucky day')
                .ok('Ja, Details einsehen')
                .cancel('Nein, weitere Fragen beantworten.')
				.clickOutsideToClose(false);

				$mdDialog.show(confirm).then(
					function() {
						
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
						console.log( "No, continue" );
					}
				);
					
			};

		} 
	]);
	
	pocketdocControllers.controller('diagnosisController', ['$scope','DiagnosisData', function($scope, DiagnosisData){
		
		$scope.diagnosis = DiagnosisData.diagnosis;
		$scope.actionSuggestion = DiagnosisData.actionSuggestion;
		
	}]);
	
	pocketdocControllers.controller('mainController', [ '$scope', '$location', '$http', function( $scope, $location,  $http ) {

        $scope.run = function() {
		  $location.url('/run');
		};
	} ]);
	
})();
