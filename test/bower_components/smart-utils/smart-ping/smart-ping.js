var smartPing = angular.module('smartPing', []);

smartPing.factory('smartPing', function ($timeout) {
  var pings = [];



  function sendPing (id, callback, timeout) {

    pings[id] = $timeout(function () {
      function next () {
        sendPing(id, callback, timeout);
      }
      callback(next);
    }, timeout);

  }

  return {
    startPing: function (id, callback, timeout) {
      sendPing(id, callback, timeout);
    },
    stopPing: function (id) {

    },
    getPings: function () {
      return pings;
    }
  }
})
