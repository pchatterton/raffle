'use strict';

var app = angular.module('rafflePrizeApp');

app.controller('AdminCtrl', function ($scope, Authentication, $location, Login, $cookieStore) {

    $scope.firstName = $cookieStore.get('adminFirstName');
    $scope.lastName = $cookieStore.get('adminLastName');
    $scope.username = $cookieStore.get('adminUsername');
});
