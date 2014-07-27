'use strict';

var app = angular.module('rafflePrizeApp');

app.controller('AdminprizesCtrl', function ($scope, $q, $cookieStore, Prizes) {

  $scope.prizesRcol = true;

  $scope.statusFilter = {status: 1};

  $scope.prizeButton = "enabled";

  var getInitPrizeData = function() {
    Prizes.getInitPrizeData().then(function(res) {
      $scope.prizes = res;
    })
  }

  getInitPrizeData();

  var fileArr = [];

  console.log('prizes page load')
  console.log(fileArr)

  $scope.onFileSelect = function($files) {
      //$files: an array of files selected, each file has name, size, and type.
      fileArr = $files;
  };

  $scope.submitPrize = function(prizeData) {
    Prizes.createPrize(fileArr, prizeData)
    console.log('response: ')
    fileArr = [];
    $scope.prizesRcol = true;
  }

  $scope.displayPrizes = function(selPrize) {
    console.log('selPrize' + selPrize)
    $scope.prizesRcol = true;
    $scope.myPrize = selPrize;
  }

  $scope.updatePrizes = function() {
    console.log('update events')
  }

  $scope.addNewPrize = function() {
    console.log('addNewPrize')
    $scope.prizesRcol = false;
  }

  $scope.$on('udpateEventID', function(event, mass) {
    var eID = mass;
    console.log(eID)

    Prizes.getPrizeData(eID).then(function(res) {
      $scope.prizes = res;
    })
  });
});
