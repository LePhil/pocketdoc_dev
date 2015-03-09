'use strict';

/* Controllers */
var pocketdocControllers = angular.module('pocketdocControllers', []);

pocketdocControllers.controller('questionController', [ "$http", "$scope", function( $http, $scope ) {
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
      },
    ];

    $http.post('http://pocketdoc.herokuapp.com/login', {name:'admin', password:"1234"}).
    success(function(data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      console.log( "SUCCESS:", data, status, headers, config );
    }).
    error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    console.log( "ERROR:", data, status, headers, config );
    });


    $scope.answerQuestion = function( question, answer ) {
      console.log(question, answer);
      question.status = answer;
    }

    $scope.isAnswered = function( question ) {
      return question.status === "unanswered";
    }
} ]);