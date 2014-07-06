'use strict';

var app = angular.module('rafflePrizeApp');

app.constant('USER_ROLES', {
    all: '*',
    admin: 'admin',
    editor: 'editor',
    regular: 'regular'
  });
