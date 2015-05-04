(function() {

	var pocketdocControllers = angular.module('pocketdocControllers', ['pocketdocBackend', 'pocketdocServices', 'ngMessages']);
    
	pocketdocControllers.controller('questionController',
		['$scope', '$location', 'RunService', 'DiagnosisData', '$mdDialog', 'DataService', 'DiagnosisService',
		function( $scope, $location, RunService, DiagnosisData, $mdDialog, DataService, DiagnosisService ) {
	
            $scope.loading = true;
			$scope.hidden = true;
			
			RunService.startRun(
				"",
				function( questionData ) {
					// Success
					console.log( questionData );
					$scope.currentQuestion = questionData;
					$scope.answeredQuestions = [];
                    $scope.loading = false;
					$scope.hidden = false;
				},
				function( error ) {
					alert( error );
				}
			);
			
			$scope.answerQuestion = function(givenAnswer) {
                $scope.loading = true;
				$scope.hidden = true;
				
				console.log("Given answer:", givenAnswer);
				RunService.answerQuestion(
					{
						answerId : givenAnswer.id
					},
					function( questionData ) {
						// Success: Add previous question to the list
						$scope.answeredQuestions.push(
							{
								question: $scope.currentQuestion,
								answer: givenAnswer
							}
						);

						// Show new question
						$scope.currentQuestion = questionData;

                        if ( typeof(givenAnswer.diagnosis) !== "undefined" &&
                             typeof(givenAnswer.action_suggestion) !== "undefined" ) {

                            DiagnosisService.getByID(
                                givenAnswer.diagnosis,
                                givenAnswer.action_suggestion,
                                function( diag ) {
                                    $scope.showDiagnosis(
                                        diag.diagnosis,
                                        diag.action_suggestion
                                    );
                                },
                                function( error ) {
                                    alert( error );
                                }
                            );

                        } else {
                            $scope.givenAnswer = undefined;
                            $scope.showNewQuestion();
                        }
					},
					function( error ) {
						alert( error );
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

                $scope.loading = false;
                $mdDialog.show( confirm ).then(
                    function() {
                        RunService.acceptDiagnosis(
                            undefined,
                            function() {
                                $location.url("/diagnosis");
                                DiagnosisData.diagnosis = diagnosis;
                                DiagnosisData.actionSuggestion = actionSuggestion;
                            },
                            function( error ) {
                                alert( error );
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

            /**
             * Used clicked on a question that they already answered to answer
             * it again.
             * 
             * @param  {Object} question
             * @param  {jQuery.Event} $event
             * @author Philipp Christen
             */
            $scope.reviseQuestion = function( question, $event ) {
                //TODO
            };
	}]);
	
	pocketdocControllers.controller('diagnosisController', ['$scope', '$location', 'DiagnosisData', 'UserService', function($scope, $location, DiagnosisData, UserService) {
		
		$scope.diagnosis = DiagnosisData.diagnosis;
		$scope.actionSuggestion = DiagnosisData.actionSuggestion;

        $scope.goToMain = function() { $location.url('/'); };
        $scope.addFollowUp = function() { $location.url('/'); };
	}]);
	
    /**
     * Gets used on the registration page and handles all interaction there.
     *
     * @name registrationController
     * @return {[type]}
     * @author Roman Eichenberger, Philipp Christen
     */
	pocketdocControllers.controller('registrationController', ['$scope', '$location', '$translate', 'UserService', function($scope, $location, $translate, UserService) {
		
		$scope.isProfile = UserService.getCurrentUser().id >= 0;
		
		$scope.user = UserService.getCurrentUser();
		var oldEmail = $scope.user.email;
		
		if ($scope.isProfile)
			$scope.user.password = " ";
		
		$scope.checkEmail = function(){
			if ($scope.isProfile)
				$scope.checkPassword();
			
			if ($scope.isProfile && oldEmail === $scope.user.email){
				$scope.registrationForm.email.$setValidity('used', true);
			}
			else{
				UserService.isEmailInUse(
					{
						email: email.value
					},
					function(data){
						$scope.registrationForm.email.$setValidity('used', !data.inUse);
					},
					function(error){
						
					}
				);
			}
		};
		
		$scope.checkPassword = function(){
			if ($scope.isProfile){
				var valid = oldPassword.value !== "" || (newPassword.value === "" && email.value === oldEmail);
				$scope.registrationForm.oldPassword.$setValidity('req', valid);
			}
			else{
				$scope.registrationForm.password.$setValidity('req', password.value !== "");
			}
		};
		
        /**
         * Sets the gender of the to-be-registered user.
         * 
         * @param {Number}
         * @author Roman Eichenberger, Philipp Christen
         */
		$scope.setGender = function(gender) {
            $scope.user.gender = gender;
		};

        /**
         * Changes the language of the to-be-registered user
         * 
         * @param  {Number}
         * @author Roman Eichenberger, Philipp Christen
         */
		$scope.changeLanguage = function(lang) {
			$scope.user.lang = lang;
		};
		
        /**
         * [cancelClick description]
         * @author Roman Eichenberger
         */
		$scope.cancelClick = function() {
			$location.url('/');
		};
		
        /**
         * [registerClick description]
         * @return {[type]}
         * @author Roman Eichenberger
         */
		$scope.registerClick = function() {
			UserService.createUser(
				$scope.user,
				function( data ) {
					alert("success");
					$scope.$root.$broadcast("login", data);
					$location.url('/');
				},
				function( error ) {
					alert( error );
				}
			);
		};
		
		$scope.saveClick = function(){
			UserService.updateUser(
				$scope.user,
				function( data ){
					$translate.use( $scope.user.lang );
					alert("success");
					$location.url('/');
				},
				function( error ){
					alert( error );
				}
			);
		};
		
		$scope.deleteClick = function(){
			UserService.deleteUser(
				undefined,
				function( data ){
					$scope.$root.$broadcast("logout", data);
					$location.url('/');
				},
				function( error ){
					alert( error );
				}
			);
		}
		
	}]);
	
	pocketdocControllers.controller('mainController', [ '$scope', '$location', '$http', '$translate', 'UserService', function( $scope, $location, $http, $translate, UserService ) {

		var currentUser = UserService.getCurrentUser();
		
		$translate.use( currentUser.lang );
		
		if ( currentUser.id !== -1 ) {
			$scope.userName = currentUser.name;
			$scope.loggedIn = true;
		} else {
			currentUser = undefined;
		}
		
        $scope.run = function() {
		  $location.url('/run');
		};
		
		$scope.$on( "login", function( event, data ) {
			$scope.userName = data.name;
			console.log( data );
			$scope.loggedIn = true;
		});
		
		$scope.$on( "logout", function( event, data ) {
			$scope.loggedIn = false;
		});
	}]);

    pocketdocControllers.controller('HeaderController',
        ['$scope', '$mdDialog', '$timeout', '$mdSidenav', '$log', '$translate', '$location', 'UserService',
        function( $scope, $mdDialog, $timeout, $mdSidenav, $log, $translate, $location, UserService ) {
            // $scope.languageBarOpen = false;
			$scope.lang = UserService.getCurrentUser().lang;
			
			$scope.$on( "login", function( event, data ) {
				$scope.loggedIn = true;
				$scope.lang = UserService.getCurrentUser().lang;
				$translate.use( $scope.lang );
			});
			
			$scope.$on( "logout", function( event, data ) {
				$scope.loggedIn = false;
				$scope.lang = UserService.getCurrentUser().lang;
				$translate.use( $scope.lang );
			})
			
            // $scope.openLanguageBar = function( $event ) {
                // $event.stopPropagation();
                // $scope.languageBarOpen = !$scope.languageBarOpen;
            // };

            $scope.changeLanguage = function( lang ) {
                $scope.language = lang;
				UserService.updateLanguage(
					{
						lang: lang
					},
					function(data){
						$scope.lang = data.lang;
						$translate.use( data.lang ).then(function ( lang ) {
							console.log("Sprache zu " + lang + " gewechselt.");
						}, function ( lang ) {
							console.log("Irgendwas lief schief.");
						});
					},
					function(error){
						alert(error);
					}
				);
            };

            $scope.toggleRight = buildToggler('right');
            /**
             * Build handler to open/close a SideNav; when animation finishes
             * report completion in console
             */
            function buildToggler( navID ) {
                return function() {
					return $mdSidenav( navID ).toggle()
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
                $scope.close();
                $location.url("/profile");
            };

            $scope.logout = function() {
                UserService.logoutUser(
					{},
					function( data ) {
						$scope.close();
						$scope.loggedIn = false;
						$scope.$root.$broadcast("logout", data);
					},
					function( error ) {
						alert( error );
					}
				);
            };

            $scope.login = function() {
            	UserService.loginUser(
					{
						email : $scope.user.email,
						password : $scope.user.password 
					},
					function( data ) {
						$scope.close();
						$scope.loggedIn = true;
						$scope.user = {};
						$scope.$root.$broadcast("login", data);
					},
					function( error ) {
						alert( error );
					}
				);
            };

            $scope.register = function() {
				$scope.close();
                $location.url("/registration");
            };

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
