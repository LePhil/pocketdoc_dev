'use strict';

/* Controllers */
var pocketdocControllers = angular.module('pocketdocControllers', []);

pocketdocControllers.controller('questionController', function($scope) {
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

    $scope.answerQuestion = function( question, answer ) {
      console.log(question, answer);
      question.status = answer;
    }

    $scope.isAnswered = function( question ) {
      return question.status === "unanswered";
    }
});