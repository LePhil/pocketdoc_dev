'use strict';

/* Controllers */
var pocketdocControllers = angular.module('pocketdocControllers', []);

pocketdocControllers.controller('questionController', [ "$http", "$scope", "$location", function( $http, $scope, $location ) {
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

    $http.post('http://pocketdoc.herokuapp.com/login', {name:'admin', password:"1234"}).
    success(function(data, status, headers, config) {
      console.log( "SUCCESS:", data, status, headers, config );
    }).error(function(data, status, headers, config) {
      console.log( "ERROR:", data, status, headers, config );
    });


    $scope.answerQuestion = function( question, answer ) {
      console.log(question, answer);
      question.status = answer;
    }

    $scope.isAnswered = function( question ) {
      return question.status === "unanswered";
    }

    $scope.goBack = function() {
      $location.url('/');
    }
} ]);

pocketdocControllers.controller('mainController', [ "$http", "$scope", "$location", function( $http, $scope, $location ) {
    $scope.run = function() {
      $location.url('/run');
    }
} ]);