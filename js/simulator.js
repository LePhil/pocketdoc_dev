(function(){

	var backend = angular.module('pocketdocBackend', ['pocketdocData']);
	
	backend.factory('UserService', [
					 '_', 'DataService',
			function( _ ,  DataService){

		// on startup, save the fake data to the localstorage 
		if ( !localStorage.getItem("users") ) {
			localStorage.setItem( "users", angular.toJson( DataService.users() ) );
		}

		var currentUser = {
			id : -1,
			lang : 'de'
		};
		
		var create = function( data, success, error ) {
			if ( currentUser.id !== -1 ) {
				error("Ein Benutzer ist aktuell eingeloggt. Bitte zuerst ausloggen.");
			} else {
				var users = JSON.parse(localStorage.getItem("users"));

				if ( users != null && users.length > 0 ) {
					data.id = _.max(users, function(user){ return user.id; }).id + 1;	//get highest ID and add 1.
				} else {
					users = [];
					data.id = 0;	//neat, first user!
				}
				
				users.push(data);
				
				localStorage.setItem( "users", angular.toJson( users ) );
				
				currentUser = data;
				delete currentUser.password;
				
				success( data );
			}
		};
		
		var get = function(data, success, error){
			
			var users = JSON.parse(localStorage.getItem("users")),
				user = $.grep(users, function(e){ return e.id == data.id; });
			
			if ( user.length == 0) {
				error("Id ist ungültig");
			}
			else{
				delete user[0].password
				success(user[0]);
			}
			
		};
		
		// TODO: refactor (e.g. only grep once)
		var update = function(data, success, error){
			var users = JSON.parse(localStorage.getItem("users"));
			var user = $.grep(users, function(e){ return e.id == data.id; })[0];
			
			if ( ( typeof(data.oldPassword) !== "undefined" && data.oldPassword !== "")
				 && data.oldPassword !== user.password ) {
				error("Das eingegebene Passwort ist fehlerhaft!");
				return;
			}
			
			if (typeof(data.newPassword) !== "undefined" && data.newPassword !== ""){
				data.password = data.newPassword;
			} else {
				data.password = user.password;
			}
			
			delete data.newPassword;
			delete data.oldPassword;
			
			users = $.grep(users, function(e){ return e.id != data.id; });
			users.push(data);
			
			localStorage.setItem( "users", angular.toJson(users) );
			
			currentUser = data;
			delete currentUser.password;
			
			success({
				name: data.name,
				lang: data.lang
			});
			
		};
		
		var del = function(data, success, error){
			var name = currentUser.name;
			var users = JSON.parse(localStorage.getItem("users"));
			var leftUsers = $.grep(users, function(e){ return e.id != currentUser.id; });
			
			if ((users.length - 1) === leftUsers.length) {
				localStorage.setItem( "users", angular.toJson(leftUsers) );
				
				// TODO: remove all openRuns, history, followUps from this user!

				currentUser = {
					id: -1,
					lang: currentUser.lang
				}
				
				success({
					name : name
				});
			} else {
				error("Fehler beim Löschen des Benutzers!");
			}
		};
		
		// TODO: refactor
		var login = function(data, success, error){
			var users = JSON.parse( localStorage.getItem("users") ) || {},
				user = $.grep( users, function( e ){
					// check if user exists by comparing the emails.
					return e.email == data.email;
				} );

			if (!user || user.length === 1){
				if (data.password === user[0].password){
					currentUser = user[0];
					delete currentUser.password;
					
					success( currentUser );
				} else {
					error("Falsches Passwort!");
				}
			} else {
				error("Benutzer nicht gefunden");
			}
		};
		
		var logout = function(data, success, error){
			
			var userName = currentUser.name;
			
			currentUser = {
				id : -1,
				lang : currentUser.lang,
			};
			
			success({name : userName});
		};
		
		var checkData = function(data, success, error){
			
		};
		
		var getCurrent = function(){
			return currentUser;
		};
		
		var updateLang = function(data, success, error){
			currentUser.lang = data.lang;
			success(
				{
					lang: currentUser.lang
				}
			);
		};
		
		var isInUse = function(data, success, error){
			var users = JSON.parse(localStorage.getItem("users"));
			
			if (users == null)
				success({inUse: false});
			else{
				var user = $.grep(users, function(e){ return e.email == data.email; });
			
				if (user.length == 0)
					success({inUse: false});
				else
					success({inUse: true});
			}
		};
		
		return {
			createUser : create,
			getUser : get,
			updateUser : update,
			deleteUser : del,
			loginUser : login,
			logoutUser : logout,
			checkUserData : checkData,
			getCurrentUser : getCurrent,
			updateLanguage : updateLang,
			isEmailInUse : isInUse
		};
		
	}]);
	
	backend.factory('HistoryService', function(){
		
		var get = function(data, success, error){
			
		};
		
		var getEntry = function(data, success, error){
			
		};
		
		var del = function(data, success, error){
			
		};
		
		var create = function(data, success, error){
			
		};
		
		return {
			getUserHistory : get,
			getHistoryEntry : getEntry,
			deleteHistoryEntry : del,
			createHistoryEntry : create
		};
				
	});
	
	backend.factory('RunService', [
				 'UserService', 'DataService', 'UtilService', 
		function( UserService,   DataService,   UtilService ){
		
		var nextQuestions = [],
		    currentQuestion,
			followUp = null;
		
		
		var start = function(data, success, error){
			var startQ = 0;

			if ( followUp !== null ) {
				startQ = followUp.startQuestion;
			}
			getQ( startQ, success, error );
		};
		
		var answerQ = function(data, success, error){
				
			var currQuestion = currentQuestion;
			var answerObj = UtilService.getElementById(data.answerId, currQuestion.answers );
			
			nextQuestions.push(answerObj.next_questions);
			
			if ( nextQuestions.length == 0 ) {
				error("Ups, uns sind die Fragen ausgegangen.");
			} else {
				getQ(nextQuestions.pop(), success, error);
			}
		};
		
		var getQ = function(questionId, success, error){
				
			var questions = DataService.questions();
			var firstQuestion = UtilService.getElementById(questionId, questions);
			
			var questionResult = {};
			
			var answerTexts = [];
			
			currentQuestion = firstQuestion;
			
			// Set Question Text 
			var langId = UtilService.getIdByLocale(UserService.getCurrentUser().lang, DataService.languages());
			var questionText = UtilService.getCurrentLanguageObject(langId, firstQuestion.description);
			questionResult.description = questionText.text;
			
			// Set Answer Texts
			for(var i = 0; i < firstQuestion.answers.length; i++)
			{
				var desc = UtilService.getCurrentLanguageObject(langId, firstQuestion.answers[i].desc);
				answerTexts.push(
					{
						id : firstQuestion.answers[i].id,
						desc : desc.text,
						style: firstQuestion.answers[i].style || "",
						diagnosis: firstQuestion.answers[i].diagnosis,
						action_suggestion: firstQuestion.answers[i].action_suggestion
					}
				);
			}

			questionResult.answers = answerTexts;
			
			success(questionResult);
			
		};
		
		var change = function(data, success, error){
			// TODO
		};
		
		var acceptDiag = function(data, success, error){
			// Aktueller Run aufräumen und beenden
			delete nextQuestions;
			success();
		};

		/**
		 * If a followUp is active, it overrides some settings, like the
		 * first question of the run.
		 *  
		 * @param  {[type]} followUp [description]
		 */
		var setFollowUp = function ( newFollowUp ) {
			followUp = newFollowUp;
		};
		
		return {
			startRun : start,
			answerQuestion : answerQ,
			getQuestionData : getQ,
			changeAnswer : change,
			acceptDiagnosis : acceptDiag,
			setFollowUp: setFollowUp
		};
		
	}]);

	backend.factory('DiagnosisService', ['DataService', 'UtilService', 'UserService', function( DataService, UtilService, UserService ){

		var langId = UtilService.getIdByLocale(UserService.getCurrentUser().lang, DataService.languages());
				
		var getAll = function(success, error){
			// TODO?
		};

		var getByID = function( diagID, actionID, success, error ) {
			var diagnosisData = {};

			// Set diagnosis
			var diagnosis = UtilService.getElementById( diagID, DataService.diagnoses() );
			diagnosisData.diagnosis = {
				id: diagID,
				short_desc : UtilService.getCurrentLanguageObject( langId, diagnosis.short_desc).text,
				description : UtilService.getCurrentLanguageObject( langId, diagnosis.description).text
			};
			
			// Set Action suggestion
			var action_suggestion = UtilService.getElementById( actionID, DataService.actionSuggestions() );
			diagnosisData.action_suggestion = {
				id: actionID,
				description : UtilService.getCurrentLanguageObject( langId, action_suggestion.description).text
			};

			if ( diagnosisData.diagnosis && diagnosisData.action_suggestion ) {
				success( diagnosisData );
			} else {
				error( "Something went wrong while getting the Diagnosis!");
			}
		};
		
		return {
			getAll : getAll,
			getByID : getByID
		};
	}]);
	
	backend.factory('FollowupService', [ '_', 'DataService', 'UtilService', 'UserService', 'RunService',
							   function(  _ ,  DataService ,  UtilService ,  UserService ,  RunService ){

		var save = function ( followUps ) {
			localStorage.setItem( "followUps", angular.toJson( followUps ) );
		};

		var register = function ( data ) {
			var followUps = getAll();

			// check if other followUps already exist
			if ( followUps != null && followUps.length > 0 ) {
				//if so, get highest ID and add 1.
				data.id = _.max(followUps, function(fUp){ return fUp.id; }).id + 1;
			} else {
				followUps = [];
				data.id = 0;	//else: first followUp!
			}

			followUps.push( data );
			
			save( followUps );
		};
		
		/**
		 * Marks a followUp as "active"
		 * 
		 * @name start
		 * @param  {Number} followUpID
		 * @author Philipp Christen
		 */
		var start = function( followUpID ){
			RunService.setFollowUp( getByID( followUpID ) );
		};
		
		/**
		 * Removes one followUp from the pile.
		 *
		 * @name   del
		 * @param  {Number} followUpID
		 * @param  {Function} success
		 * @param  {Function} error
		 * @author Philipp Christen
		 */
		var del = function(followUpID, success, error){
			var followUps = getAll();

			// removes the followUp with the passed ID
			followUps = _.reject( followUps, function(fUp){
				return fUp.id === followUpID;
			});
			
			save( followUps );

			//TODO? : check if deletion was successfull
			success( followUpID );
		};
		
		/**
		 * Returns all followUps
		 *
		 * @name   getAll
		 * @return {Array}
		 * @author Philipp Christen
		 */
		var getAll = function(){
			return JSON.parse( localStorage.getItem("followUps") );
		};

		/**
		 * Returns a single follow up.
		 * 
		 * @param  {[type]} id id of the follow up
		 * @return {Object}    followUp with the passed id
		 * @author Philipp Christen
		 */
		var getByID = function( id ) {
			return _.find( getAll(), function(fUp) { return fUp.id === id; });
		};

		/**
		 * Gets all followUps for a single user.
		 *
		 * @name   getByUserID
		 * @param  {Number} userID
		 * @return {Array}
		 * @author Philipp Christen
		 */
		var getByUserID = function( userID ) {
			var followUps = _.filter( getAll(), function( fUp ){
				return fUp.user === userID;
			});
			return followUps;
		};

		/**
		 * [getStartQuestion description]
		 * @param  {[type]} followUpID [description]
		 * @return {[type]}            [description]
		 */
		var getStartQuestion = function( followUpID ) {
			return getByID( followUpID ).startQuestion;
		};


		// on startup, save the fake data to the localstorage if that hasn't
		// happened already
		if ( !localStorage.getItem("followUps") ) {
			save( DataService.followUps() );
		}
		
		return {
			registerFollowup : register,
			startFollowup : start,
			deleteFollowup : del,
			getFollowupsForUser : getByUserID,
			getAll: getAll,
			getByID: getByID
		};
		
	}]);
	
	backend.factory('UtilService', function(){
		
		var UtilService = {
			
			getElementById : function(id, array){
				var obj = $.grep(array, function(e){ return e.id == id; });
				return obj[0];
			},
			
			getCurrentLanguageObject : function(langId, dataArray){
				var obj = $.grep(dataArray, function(e){ return e.lang == langId; });
				return obj[0];
			},
			
			getLocaleById : function(langId, dataArray){
				var obj = $.grep(dataArray, function(e){ return e.id == langId; });
				return obj[0].locale;
			},
			
			getIdByLocale : function(localeId, dataArray){
				var obj = $.grep(dataArray, function(e){ return e.locale == localeId; });
				return obj[0].id;
			}
			
		};
		
		return UtilService;
		
	});
	
	
})();