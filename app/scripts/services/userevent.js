'use strict';

var app = angular.module('rafflePrizeApp');

app.factory('userEvent', function ($http, $q, $cookieStore) {
  
    //Define variables used
    var userEventService = {};
    var userEventData = {};
    var userVoteData = {};
    var maxVotes = 0;
    var votesUsed = 0;
    var votesRemaining = 0;
    var voteChanges = [];

    //Retreive all the prize info based off the eventID
    //On success, sets the userEventData
    userEventService.eventPrizeRequest = function() {
      var eventId = $cookieStore.get('eventID');
      var deferred = $q.defer();
      $http({
          method: 'GET',
          url: 'http://localhost:12000/eventUser/' + eventId
        }).success(function(res) {
          userEventData = res.eventData;            
          deferred.resolve(res);
        }).
          error(function(res) {
            deferred.reject();
            });
      return deferred.promise
    }

    userEventService.getUserVotes = function () {
      var userId = $cookieStore.get('userID');
      var deferred = $q.defer();
      $http({
          method: 'GET',
          url: 'http://localhost:12000/getVotes/' + userId
        }).success(function(res) {
            userVoteData = res;
            userEventService.combinePrizeVotes();
            userEventService.countPrizeVotes(res);
            userEventService.changesMadeInit(res);
              deferred.resolve(res);
            }).
              error(function(res) {
                deferred.reject();
            });
      return deferred.promise
    }

    userEventService.countPrizeVotes = function(voteData) {
      var count = 0;
      if(!(voteData.length === 0)) {
        for(var i = 0; i<voteData.length; i++) {
          count += voteData[i].votes;
        }
        votesUsed = count;
      }
    }

    userEventService.combinePrizeVotes = function () {
      for (var key in userEventData) {
        userEventData[key].votes = 0;
      }
      for(var i=0; i<userVoteData.length; i++) {
        for(var key in userEventData) {
          if(userVoteData[i].prizeID === userEventData[key].id) {            
            userEventData[key].votes = userVoteData[i].votes;
          }
        }
      }
    }

    userEventService.getEventInfo = function() {
      var eventId = $cookieStore.get('eventID');
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'http://localhost:12000/eventUser/data/' + eventId
      }).success(function(res) {
            maxVotes = res.eventData.startNumVotes;
            votesRemaining = maxVotes - votesUsed;
            deferred.resolve(res);
          }).
            error(function(res) {
              deferred.reject();
          });
      return deferred.promise

    }

    userEventService.getPrizeData = function() {
      return userEventData;
    }

    userEventService.changesMadeInit = function(changes) {
      if(!(changes.length === 0)) {
        for(var i = 0; i<changes.length; i++) {
          var objChange = {
            prizeID: changes[i].prizeID,
            votes: changes[i].votes
          }
          voteChanges.push(objChange)
        }
      } else {
      }
    }

    userEventService.changesMade = function(newChange, changeType) {
      var createNew = true;
      if(changeType === 'add') {
        if(voteChanges.length === 0){
          var objChange = {
            prizeID: newChange[0].prizeID,
            votes: 1
          }
          voteChanges.push(objChange);
          newChange.shift();
        }
        var vCL = voteChanges.length;
        if(newChange.length === 0)  {
        } else if(newChange.length === 1) {
          for(var j=0; j<vCL; j++) {
            if(voteChanges[j].prizeID === newChange[0].prizeID) {
              voteChanges[j].votes++;
              createNew = false;
              break;
            };
          }
          if(createNew) {
            var objChange = {
              prizeID: newChange[0].prizeID,
              votes: 1
            }
            voteChanges.push(objChange)
          } 
        } else {
            for(var i=0; i<newChange.length; i++) {
              for(var j=0; j<vCL; j++) {
                if(voteChanges[j].prizeID === newChange[i].prizeID) {
                  voteChanges[j].votes++;
               } else {
                var objChange = {
                  prizeID: newChange[i].prizeID,
                  votes: 1
                }
                voteChanges.push(objChange)
              }
            } 
          }
        }  
      } else if(changeType === 'minus') {
          var vCL = voteChanges.length;
          if(newChange.length === 0)  {
            } else if(newChange.length === 1) {
              for(var j=0; j<vCL; j++) {
                if(voteChanges[j].prizeID === newChange[0].prizeID) {
                  voteChanges[j].votes--;
                  break;
                }
              }  
            } else {
                for(var i=0; i<newChange.length; i++) {
                  for(var j=0; j<vCL; j++) {
                    if(voteChanges[j].prizeID === newChange[i].prizeID) {
                      voteChanges[j].votes--;
                    }
                  } 
                }
              }  
            }
          }

    //Retrieves the updated EventData
    userEventService.getAllData = function() {
      return userEventData;
    }

    userEventService.votesRemaining = function() {
      return votesRemaining;
    }

    userEventService.addVote = function(prizeData) {
      if((maxVotes - votesRemaining) === maxVotes) {
        return false;
      } else {
          votesUsed++;
          votesRemaining--;
          var tempArr = [];
          var tempObj = {
            prizeID: prizeData.id
          }
          tempArr.push(tempObj)
          userEventService.changesMade(tempArr, 'add')
          return true;
      }
    }

    userEventService.minusVote = function(prizeData) {
      if((maxVotes - votesRemaining) === 0) {
        return false;
      } else {
        votesUsed--;
        votesRemaining++;
        var tempArr = [];
        var tempObj = {
          prizeID: prizeData.id
        }
        tempArr.push(tempObj)
        userEventService.changesMade(tempArr, 'minus')
        return true
      }
    }

    userEventService.submitUpdates = function() {
      var userId = $cookieStore.get('userID');
      var deferred = $q.defer();
      $http({
          method: 'POST',
          url: 'http://localhost:12000/eventUser/submit/' + userId,
          data: voteChanges
        }).success(function(res) {
          voteChanges.splice(0,voteChanges.length);
          deferred.resolve(res);
        }).
          error(function(res) {
            deferred.reject();
            });
      return deferred.promise
    }

    userEventService.getUserID = function() {
      var id = $cookieStore.get('userID');
      return id;
    }

    return userEventService;

  });