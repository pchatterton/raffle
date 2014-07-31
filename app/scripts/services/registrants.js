'use strict';

var app = angular.module('rafflePrizeApp');

app.factory('Registrants', function Event($http, $q, $cookieStore, Event) {

   var registrantsService = {};
   var newRegistrants = [];
   var failedUpload = [];
   // var uploadOjb = {};


    registrantsService.verifyText = function(text) {
    	var tempRegistrants = []
    	tempRegistrants = text.split(';');
    	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	for(var i=0; i<tempRegistrants.length; i++) {
    		tempRegistrants[i] = tempRegistrants[i].replace(/ /g,'')
    		var result = re.test(tempRegistrants[i])
    		if(result) {
    			newRegistrants.push(tempRegistrants[i])
    		} else {
    			if (!(tempRegistrants[i] === '')) {
    				failedUpload.push(tempRegistrants[i])
    			};
    		}
    	}
    }

    // registrantsService.convertObj = function() {
    // 	for(var i=0; i<newRegistrants.length; i++) {
    // 		uploadObj
    // 	}
    // }

    registrantsService.postRegistrants = function() {
    	console.log(newRegistrants)
    	var eventId = Event.getEventId()    
    	var deferred = $q.defer();
        $http({
            method: 'POST',
            url: 'http://localhost:12000/event/registrants/' + eventId,
            data: {
            	emails: newRegistrants
            }
       	}).success(function(res) {
       			console.log('success')
       			newRegistrants = [];
       			failedUpload = []
                deferred.resolve(res);
            }).
            	error(function(res) {
                  deferred.resolve
              	});
        return deferred.promise
    }

    registrantsService.getRegistrants = function() {
    	return newRegistrants;
    }

    registrantsService.getFailedUpload = function() {
    	return failedUpload;
    }

    return registrantsService;


  }); //Close Factory
