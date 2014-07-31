'use strict';

var app = angular.module('rafflePrizeApp');

app.factory('Registrants', function () {

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


    registrantsService.getRegistrants = function() {
    	return newRegistrants;
    }

    registrantsService.getFailedUpload = function() {
    	return failedUpload;
    }

    return registrantsService;


  }); //Close Factory
