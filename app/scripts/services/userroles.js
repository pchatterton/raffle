'use strict';

angular.module('rafflePrizeApp')
  .service('UserRoles', {
    all: '*',
    admin: 'admin',
    editor: 'editor',
    guest: 'guest'
  });
