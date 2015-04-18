(function(){

	var pocketdocControllers = angular.module('pocketdocControllers', ['pocketdocBackend']);

	pocketdocControllers.controller('questionController',
		[ "$http", "$scope", "$location", '$cookies','$cookieStore', '$anchorScroll', "User", "nextQuestionFactory", "runFactory", '$mdDialog',
    function( $http, $scope, $location, $cookies, $cookieStore, $anchorScroll, User, nextQuestionFactory, runFactory, $mdDialog ) {

	
		$scope.finished = false;

		$scope.no_suggestion = "Noch keine Handlungsempfehlung möglich.";
		$scope.no_diagnosis = "Noch keine Diagnosis möglich.";
		$scope.questions = [];
		$scope.currentQuestion = {};
		$scope.loading = false;
        $scope.diagnosis = null;
        $scope.recommendation = null;

        $scope.user = User;

        $scope.login = function( callback ) {
            if ( !$scope.user.loggedIn ) {
                $http({
                    'method': 'POST',
                    'url': 'http://pocketdoc.herokuapp.com/login',
                    'withCredentials': false,
                    headers: { 'Content-Type': 'text/plain' },
                    data: { name: "admin", password: "1234" }
                }).success(function(data, status, headers, config) {
                    console.log( "SUCCESS on Login:", data, status, headers, config );
                    $scope.user.id = data.id;
                    $scope.user.loggedIn = true;

                    if ( callback && angular.isFunction( callback ) ) {
                        callback();
                    } else {
                        $scope.getQuestion();
                    }
                }).error(function(data, status, headers, config) {
                    console.log( "ERROR on Login:", data, status, headers, config );
                });
            }
        };

        $scope.start = function() {
            $scope.login( $scope.restartRun );
        }

        $scope.getDiagnosis = function() {
            if ($scope.user.loggedIn) {

                runFactory.getDiagnosis({Id: $scope.user.id}, function (result) {
                    debugger;

                });
            } else {
                console.log("NOT LOGGED IN");
            }
        };

		$scope.getQuestion = function() {
			if ($scope.user.loggedIn) {
                $scope.loading = true;
                $("#contentContainer").animate({ scrollTop: $(document).height() }, "slow");

				console.log("Neue Frage laden...");

                return nextQuestionFactory.get({Id: $scope.user.id}, function (newQuestion) {
                    console.log("Neue Frage erhalten...");
                    console.log(newQuestion);
                    $scope.loading = false;

                    if (angular.isUndefined(newQuestion.descriptions)) {
                        $location.url("/diagnosis");
                        // well... no description found...
                        return;
                    }

                    // before showing the next question, check if there's a diagnosis!
                    runFactory.getDiagnosis({Id: $scope.user.id}, function (diagnosisResult) {
                        debugger;

                        $scope.showQuestion( newQuestion );

                        if( !angular.isUndefined( diagnosisResult.diagnosis ) ) {
                            //show diagnosis now. If not OK with the user, continue with the questions

                            diagnosisResult.diagnosis.descriptions.forEach(function (description) {
                                if (angular.equals(description.language_name, "Deutsch")) {
                                    diagnosisResult.german_description = description.description;
                                }
                            });

                            $scope.askDiagnosisOk( diagnosisResult );
                            //var accepted = confirm( "Diagnosis:" + diagnosisResult.german_description );
                        }
                    });
                    /*
                    if (angular.isUndefined(result.descriptions)) {
                        $location.url("/diagnosis");
                        // well... no description found...
                    } else {

                        // only get German for now
                        result.descriptions.forEach(function (description) {
                            if (angular.equals(description.language_name, "Deutsch")) {
                                result.german_description = description.description;
                            }
                        });

                        var newQuestion = {
                            'id': result.question_id,
                            'status': 'unanswered',
                            'subject': result.name,
                            'text': result.german_description,    // TODO: I18N
                            'answer_yes': result.answer_yes,
                            'answer_no': result.answer_no
                        };

                        console.log(newQuestion);
                        $scope.currentQuestion = newQuestion;
                        $scope.loading = false;

                        $("#contentContainer").animate({ scrollTop: $(document).height() }, "slow");
                    }
                    */

                }, function( result ){
                    // CONNECTION ERROR
                    console.log( "CONNECTION FAILED - BACKEND DEAD" );
                });
			} else {
                console.log( "NOT LOGGED IN" );
            }
		};

        $scope.showQuestion = function( newQuestion ) {
            if (angular.isUndefined(newQuestion.descriptions)) {
                // well... no description found...
                $scope.finished = true;
            } else {

                // only get German for now
                newQuestion.descriptions.forEach(function (description) {
                    if (angular.equals(description.language_name, "Deutsch")) {
                        newQuestion.german_description = description.description;
                    }
                });

                var questionToAdd = {
                    'id': newQuestion.question_id,
                    'status': 'unanswered',
                    'subject': newQuestion.name,
                    'text': newQuestion.german_description,    // TODO: I18N
                    'answer_yes': newQuestion.answer_yes,
                    'answer_no': newQuestion.answer_no
                };
                //$scope.questions.push(questionToAdd);
                $scope.finished = false;
                console.log(questionToAdd);
                $scope.currentQuestion = questionToAdd;
                $scope.loading = false;

                $("#contentContainer").animate({ scrollTop: $(document).height() }, "slow");
            }
        };

        $scope.askDiagnosisOk = function( diagnosis, e){
            var confirm = $mdDialog.confirm()
                .title('Diagnose Gefunden')
                .content( 'Unsere Diagnose: ' + diagnosis.german_description )
                .ariaLabel('Lucky day')
                .ok('Diagnose Ok')
                .cancel('Weitere Fragen beantworten')
                .targetEvent(e);

            $mdDialog.show(confirm).then(function() {
                // Ok
                console.log( "Yes, that's it!" );
                // show details
                $scope.questions = {};
                User.run.recommendation = "";
                User.run.diagnosis = diagnosis.german_description;

                if ( diagnosis.action_suggestions.length ) {
                    diagnosis.action_suggestions.forEach(function (action) {
                        action.descriptions.forEach(function (desc) {
                            if (angular.equals(desc.language_name, "Deutsch")) {
                                User.run.recommendation += desc.description;
                            }
                        });
                    });
                }

                debugger;

                $location.url("/diagnosis");
            }, function() {
                console.log( "No, continue" );
            });
        };

        /**
         * Restarts the run and starts a new one.
         */
        $scope.restartRun = function() {
            if ($scope.user.loggedIn) {
                runFactory.resetRun({Id: $scope.user.id}, function (result) {
                    $scope.finished = false;
                    $scope.currentQuestion = {};
                    $scope.getQuestion();
                });
            } else {
                console.log("NOT LOGGED IN");
            }

        };
		
		/**
		 * Gets triggered when a question was answered
		 * @param  {[type]}
		 * @param  {[type]}
		 */
		$scope.answerQuestion = function( answer ) {
			
			var question = $scope.currentQuestion;
			console.log(question, answer);
			question.status = answer;

			var idToSend;
			if ( answer === "positive") {
				idToSend = question.answer_yes;
			} else {
				idToSend = question.answer_no;
			}
			
			$scope.questions.push(question);
			$scope.currentQuestion = {};
            $scope.loading = true;

			//send answer to / run / user /:id (as PUT and with request answer_id : < Number >)
			var asd = runFactory.sendAnswer({Id: $scope.user.id}, {answer_id: idToSend.answer_id}, function (result) {
				// get next question
				$scope.getQuestion();
			});

		};
		/**
		 * checks if a question was answered already
		 * @param  {[type]}
		 * @return {Boolean}
		 */
//		$scope.isAnswered = function( question ) {
//		  return question.status === "unanswered";
//		}
		/**
		 * returns to the main page
		 * @return {[type]}
		 */
		$scope.goBack = function() {
		  $location.url('/');
		};
        $scope.goToRun = function() {
            $location.url('/run');
        };
		$scope.isLoading = function() {
			return $scope.loading;
		};

        $scope.start();
	} ]);

	pocketdocControllers.controller('mainController', [ "$scope", "$location", function( $scope, $location ) {

        $scope.run = function() {
		  $location.url('/run');
		};
	} ]);
	
})();
