'use strict';

/* Controllers */
var pocketdocControllers = angular.module('pocketdocControllers', []);

pocketdocControllers.controller('questionController', [ "$http", "$scope", "$location", "User", function( $http, $scope, $location, User ) {
    $http({ withCredentials: true });

    $scope.userInfos = User;

    $scope.questions = [
      {
        'id'     : 0,
        'status' : 'unanswered',
        'subject': 'Fieber?',
        'text'   : 'Haben Sie Fieber?'
      },
      {
        'id'     : 1,
        'status' : 'unanswered',
        'subject': 'Hohes Fieber?',
        'text'   : 'Ist Ihr Fieber über 38.5 °C ?'
      },
      {
        'id'     : 2,
        'status' : 'unanswered',
        'subject': 'Sehr hohes Fieber?',
        'text'   : 'Ist Ihr Fieber über 41.1 °C ?'
      },
      {
        'id'     : 3,
        'status' : 'unanswered',
        'subject': 'Bauchschmerzen?',
        'text'   : 'Haben Sie Bauchschmerzen?'
      },
      {
        'id'     : 4,
        'status' : 'unanswered',
        'subject': 'Blähungen?',
        'text'   : 'Haben Sie Blähungen?'
      }
    ];

    $http.post('http://pocketdoc.herokuapp.com/login', {name: $scope.userInfos.name , password:"1234"}).
    success(function(data, status, headers, config) {
      console.log( "SUCCESS:", data, status, headers, config );
      $scope.userInfos.id = data.id;
      console.log( data.id );

      getQuestion();
    
    }).error(function(data, status, headers, config) {
      console.log( "ERROR:", data, status, headers, config );
    });

    /**
     * Gets the next question from the server
     * @return {[type]}
     */
    function getQuestion() {
      console.log("getting question");

      $http.get('http://pocketdoc.herokuapp.com/nextQuestion/user/'+$scope.userInfos.id).
      success(function(data, status, headers, config) {
        console.log( "SUCCESS:", data, status, headers, config );
        
      
      }).error(function(data, status, headers, config) {
        console.log( "ERROR:", data, status, headers, config );
      });
    };

    /**
     * Gets triggered when a question was answered
     * @param  {[type]}
     * @param  {[type]}
     */
    $scope.answerQuestion = function( question, answer ) {
      console.log(question, answer);
      question.status = answer;
    }
    /**
     * checks if a question was answered already
     * @param  {[type]}
     * @return {Boolean}
     */
    $scope.isAnswered = function( question ) {
      return question.status === "unanswered";
    }
    /**
     * returns to the main page
     * @return {[type]}
     */
    $scope.goBack = function() {
      $location.url('/');
    }
} ]);

pocketdocControllers.controller('mainController', [ "$http", "$scope", "$location", function( $http, $scope, $location ) {
    $scope.run = function() {
      $location.url('/run');
    }
} ]);