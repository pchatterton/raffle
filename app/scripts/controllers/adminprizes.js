'use strict';

var app = angular.module('rafflePrizeApp');

app.controller('AdminprizesCtrl', function ($scope, $q, $cookieStore, Prizes) {

  $scope.prizesRcol = false;
  $scope.statusFilter = {status: 1};
  $scope.prizeButton = "enabled";
  $scope.dropSpan = true;

  var getInitPrizeData = function() {
    Prizes.getInitPrizeData().then(function(res) {
      $scope.prizes = res;
    })
  }

  getInitPrizeData();

  var fileArr = [];

  $scope.onFileSelect = function($files) {
      fileArr = $files;
  };

  $scope.changeDropSpans = function() {
    $scope.dropSpan = false;
    $scope.dropFile = fileArr[0].name;
  }

  $scope.submitPrize = function(prizeData) {
    Prizes.createPrize(fileArr, prizeData)
    fileArr = [];
    $scope.prizesRcol = true;
  }

  $scope.displayPrizes = function(selPrize) {
    $scope.prizesRcol = true;
    $scope.myPrize = selPrize;
  }

  $scope.addNewPrize = function() {
    $scope.prizesRcol = false;
    fileArr = [];
    $scope.dropSpan = true;
  }

  $scope.$on('udpateEventID', function(event, mass) {
    var eID = mass;
    console.log(eID)

    Prizes.getPrizeData(eID).then(function(res) {
      $scope.prizes = res;
    })
  });

  // $scope.disablePrize() = function(prize) {
  //   console.log('prize: ' + prize)
  //   // Prizes.updateStatus(prize).then(function(res) {

  //   // })
  // }

});
