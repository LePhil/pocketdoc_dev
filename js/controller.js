(function() {

	var pocketdocControllers = angular.module('pocketdocControllers', ['pocketdocBackend', 'pocketdocServices', 'ngMessages']);

	pocketdocControllers.controller('questionController',
		        ['$scope', '$location', 'RunService', 'DiagnosisData', '$mdDialog', 'DataService', 'DiagnosisService',
		function( $scope,   $location,   RunService,   DiagnosisData,   $mdDialog,   DataService,   DiagnosisService ) {
	
            $scope.loading = true;
			$scope.hidden = true;
			
			RunService.startRun(
				"",
				function( questionData ) {
					// Success
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
				
				RunService.answerQuestion(
					{
						answerId : givenAnswer.id
					},
					function( questionData ) {
                        // Success: Add previous question to the list
                        // "position" is used for getting the position in the list
						$scope.answeredQuestions.push(
							{
                                position: $scope.answeredQuestions.length,
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
                                    $scope.showDialog(
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

            /**
             * Mini-Controller for Custom Dialog, provides some simple methods
             * and makes the passed data available in the template.
             * 
             * @param {[type]} $scope           [description]
             * @param {[type]} $mdDialog        [description]
             * @param {[type]} diagnosis        [description]
             * @param {[type]} actionSuggestion [description]
             * @author Philipp Christen
             */
            var DialogController = function($scope, $mdDialog, diagnosis, actionSuggestion) {
                $scope.diagnosis = diagnosis;
                $scope.actionSuggestion = actionSuggestion;

                $scope.cancel = function() { $mdDialog.cancel(); };
                $scope.accept = function() { $mdDialog.hide(); };
            };

            /**
             * Shows the "diagnosis found" dialog.
             * 
             * @param  {[type]} diagnosis        [description]
             * @param  {[type]} actionSuggestion [description]
             * @param  {jQuery.Event} ev [description]
             * @author Philipp Christen, Roman Eichenberger
             */
            $scope.showDialog = function( diagnosis, actionSuggestion, ev ) {
                $scope.loading = false;
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: '../partials/diagDialog.html',
                    targetEvent: ev,
                    resolve: {
                        diagnosis: function(){ return diagnosis; },
                        actionSuggestion: function(){ return actionSuggestion; }
                    }
                })
                .then( function() {
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
                }, function() {
                    $scope.showNewQuestion();
                });
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
            $scope.reviseQuestion = function( qData, $event ) {
                var pos = qData.position;
                $scope.answeredQuestions.splice( pos, $scope.answeredQuestions.length-pos+1 );

                // TODO: answers still get counted for the old currentQuestion...
                // Fix in the simulator, don't just get the next question...
                $scope.currentQuestion = qData.question;
            };
	}]);
	
	pocketdocControllers.controller('diagnosisController',
                ['$scope', '$location', 'DiagnosisData', 'UserService', 'FollowupService', 'RunService',
        function( $scope ,  $location ,  DiagnosisData ,  UserService ,  FollowupService ,  RunService ) {
		
		$scope.diagnosis = DiagnosisData.diagnosis;
		$scope.actionSuggestion = DiagnosisData.actionSuggestion;
        $scope.followUp = RunService.getFollowUp();
        $scope.isFollowUp = $scope.followUp != null;
        $scope.isSameDiag = false;
        $scope.isLoggedIn = UserService.isLoggedIn();

        if ( $scope.isFollowUp ) {
            $scope.isSameDiag = $scope.diagnosis.id === $scope.followUp.oldDiagnosis;
        }

        $scope.goToMain = function() { $location.url('/'); };

        /**
         * add a follow-up to the existing ones for the current user.
         * Only registered and logged in users can do that, though.
         * A follow-up contains the old diagnosis and action suggestion,
         * as well as the owner (user) and the question where it should start.
         * Additionally, the current time will be saved, too.
         *
         * @name addFollowUp
         * @author Philipp Christen
         */
        $scope.addFollowUp = function() {
            // only save follow-up when logged in!
            var userID = UserService.getCurrentUser().id;

            if ( userID > -1 ) {
                var followUpData = {
                    "user": userID,
                    "oldDiagnosis": $scope.diagnosis.id,
                    "oldActionSuggestion": $scope.actionSuggestion.id,
                    "startQuestion": 5,  // TODO get correct q,
                    "timeAdded": Date.now()
                };

                FollowupService.registerFollowup( followUpData );
                $location.url('/');
            }
        };

        /**
         * TODO !
         * [registerForFollowUp description]
         * @return {[type]} [description]
         */
        $scope.registerForFollowUp = function() {
            // $location.url("/registration");
        };
	}]);
	
    /**
     * Gets used on the registration page and handles all interaction there.
     *
     * @name registrationController
     * @return {[type]}
     * @author Roman Eichenberger, Philipp Christen
     */
	pocketdocControllers.controller('registrationController', ['$scope', '$location', '$translate', '$mdDialog', 'UserService', function($scope, $location, $translate, $mdDialog, UserService) {
		
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
						email: $scope.user.email
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
				var oldPw = $scope.user.oldPassword;
				var newPw = $scope.user.newPassword;
				var valid = (typeof(oldPw) !== "undefined" && oldPw !== "") || ((typeof(newPw) === "undefined" || newPw === "") && $scope.user.email === oldEmail);
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
					$location.url('/');
				},
				function( error ){
					alert( error );
				}
			);
		};
		
		$scope.deleteClick = function(){
			
			var confirm = $mdDialog.confirm()
				.title('Account löschen')
				.content( 'Sie sind im Begriff, den Account unwiderruflich zu löschen. Möchten Sie fortfahren?' )
				.ariaLabel('Lucky day')
				.ok('Ja, Account löschen')
				.cancel('Nein, Account behalten')
				.clickOutsideToClose(false);

			$mdDialog.show( confirm ).then(
				function() {
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
				},
				function() {
				}
			);
		};
		
	}]);
	
	pocketdocControllers.controller('mainController',
               [ '_', '$scope', '$location', '$http', '$translate', 'UserService', 'FollowupService', '$mdDialog', 'DiagnosisService', '$interval', 
        function( _ ,  $scope ,  $location ,  $http ,  $translate ,  UserService ,  FollowupService ,  $mdDialog ,  DiagnosisService ,  $interval ) {
		
        $scope.followUps = [];

        $scope.hasNoFollowUps = function() { return _.isEmpty( $scope.followUps ); }

        $scope.run = function() {
		  $location.url('/run');
		};
		
		$scope.$on( "login", function( event, data ) {
            $scope.handleLogin( data );
		});
		
		$scope.$on( "logout", function( event, data ) {
			$scope.handleLogout();
		});

        /**
         * Delete a followUp from the list on the main page.
         * Shows a confirmation dialog to the user before deleting it.
         * 
         * @param  {[type]} followUp [description]
         * @param  {[type]} $event   [description]
         * @author Philipp Christen
         */
        $scope.deleteFollowUp = function ( followUp, $event ) {
            var confirm = $mdDialog.confirm()
                .title('FollowUp entfernen?')
                .content( 'Wollen Sie diesen FollowUp wirklich löschen?' )
                .ariaLabel('Wirklich löschen?')
                .ok('Ja')
                .cancel('Nein')
                .clickOutsideToClose(false);

            $mdDialog.show( confirm ).then(
                function() {
                    FollowupService.deleteFollowup(
                        followUp.id,
                        function( removedID ){
                            $scope.followUps = _.reject( $scope.followUps, function(fUp){ return fUp.id === removedID; });
                        },
                        function( error ){
                            alert( error );
                        }
                    );
                },
                function() { /* wasn't successfull */ }
            );
        };

        /**
         * Starts a followUp.
         *
         * Idea: Save active followUp on the user, then check if there's an
         * active followUp when the run gets started (qController) and act
         * accordingly.<-- TODO
         *
         * @name   startFollowUp
         * @param  {Object} followUp
         * @param  {jQuery.event} $event
         * @author Philipp Christen
         */
        $scope.startFollowUp = function ( followUp, $event ) {
            FollowupService.startFollowup( followUp.id );
            $location.url( '/run' );
        };

        /**
         * Gets called upon login. Sets certain values that are provided by the
         * logged in user, e.g. their name.
         *
         * @name   handleLogin
         * @param  {Object} user
         * @author Philipp Christen
         */
        $scope.handleLogin = function ( user ) {
            $scope.userName = user.name;
            $scope.loggedIn = true;
            $scope.followUps = FollowupService.getFollowupsForUser( user.id );
            currentUser = user;
        };

        $scope.getDiagnosis = function( followUp ) {
            return DiagnosisService.getDiagByID( followUp.oldDiagnosis ).short_desc;
        };

        /**
         * Gets called when a user logged out. Resets user-related settings.
         *
         * @name   handleLogout
         * @author Philipp Christen
         */
        $scope.handleLogout = function () {
            $scope.userName = "";
            $scope.loggedIn = false;
            $scope.followUps = [];
            currentUser = undefined;
        };

        /**
         * Calculates the age of the followUp and returns true if it's less
         * than 4 hours.
         * 
         * @param  {Timestamp}  timeAdded
         * @return {Boolean}
         * @author Philipp Christen
         */
        $scope.isFollowUpReady = function( timeAdded ) {
            return new Date() - timeAdded > 4*60*60 *1000;
        }

        $scope.getRemainingTime = function( timeAdded ) {
            return timeAdded + 4*60*60*1000 - new Date();
        }

        /*
        
        if followUp is "locked", count down. for that we need to poke angular
        every second...
        */
        $interval(function(){
            // nothing is required here, interval triggers digest automaticaly
        },1000)
        
        var currentUser = UserService.getCurrentUser();

        $translate.use( currentUser.lang );
        
        if ( currentUser.id !== -1 ) {
            $scope.handleLogin( currentUser );
        } else {
            $scope.handleLogout();
        }
	}]);

    pocketdocControllers.controller('HeaderController',
        ['$scope', '$mdDialog', '$timeout', '$mdSidenav', '$log', '$translate', '$location', 'UserService',
        function( $scope, $mdDialog, $timeout, $mdSidenav, $log, $translate, $location, UserService ) {
			
            $scope.lang = UserService.getCurrentUser().lang;
			$scope.location = $location;
			
			// Resize handler to calculate layout
			$scope.resize = function(){
				var height = window.innerHeight;
				var footerHeight = $('#footer').height();
				var headerHeight = $('#header').height();
				$('#partialContent').css('marginBottom', footerHeight);
			}
			
			window.onresize = $scope.resize();
			
			$scope.$on( "login", function( event, data ) {
				$scope.loggedIn = true;
				$scope.lang = UserService.getCurrentUser().lang;
				$translate.use( $scope.lang );
			});
			
			$scope.$on( "logout", function( event, data ) {
				$scope.loggedIn = false;
				$scope.lang = UserService.getCurrentUser().lang;
				$translate.use( $scope.lang );
			});
			
			$scope.$on("resize", function(event, data){
				$scope.resize();
			});

            $scope.changeLanguage = function( lang ) {
                $scope.language = lang;
				UserService.updateLanguage(
					{
						lang: lang
					},
					function(data){
						$scope.lang = data.lang;
						$translate.use( data.lang ).then(function ( lang ) {
						}, function ( lang ) {
							console.log("Error occured while changing language");
						});
					},
					function(error){
						alert(error);
					}
				);
            };

            $scope.toggleRight = buildToggler('right');
            
            // Build handler to open/close a SideNav
            function buildToggler( navID ) {
                return function() {
					return $mdSidenav( navID ).toggle()
                        .then(function () { /* done */ });
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

            /**
             * Navigates back to the main page.
             * 
             * @author Philipp Christen
             */
            $scope.goToMain = function () {
                $location.url("/");
            };

            /**
             * TODO: RESET ALL LOCALSTORAGE FOR DEMONSTRATION PURPOSES!
             * [resetForDemo description]
             * @return {[type]} [description]
             * @author Philipp Christen
             */
            $scope.resetForDemo = function() {
                //TODO:
            };
    }]);

})();
