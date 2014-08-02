'use strict';

var app = angular.module('rafflePrizeApp');

app.factory('Registrants', function Event($http, $q, $cookieStore, Event) {

   var registrantsService = {};
   var newRegistrants = [];
   var failedUpload = [];


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

    registrantsService.getCurrentRegistrants = function() {
    	console.log('step2')
    	var eventId = Event.getEventId()
    	console.log('id' + eventId) 
    	var deferred = $q.defer();
        $http({
            method: 'GET',
            url: 'http://localhost:12000/event/registrants/' + 1
       	}).success(function(res) {
                deferred.resolve(res);
            }).
            	error(function(res) {
                  deferred.resolve
              	});
        return deferred.promise
    }

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
