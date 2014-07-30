'use strict';

var app = angular.module('rafflePrizeApp');

app.directive('scrollToFixed', function(){
    return {
        restrict: 'A',
        link: function(scope, elem, attributes){
            console.log("testing scroll to fixed.");
            $("elem").scrollToFixed({
                preFixed: function() { 
                    $('.user-event-top-menu').removeClass('container').hide().fadeIn(300);
                    $(this).css('opacity', '.95'); 
                },
                postFixed: function() { 
                    $('.user-event-top-menu').addClass('container').hide().fadeIn(300);
                    $(this).css('opacity', '1');
                }
            });
        }
    }
});
