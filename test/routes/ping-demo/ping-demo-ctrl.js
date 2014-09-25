smartDemo.controller('PingDemoCtrl', function ($scope, smartPing) {


  $scope.startPing = function (id) {
    function callback (next) {
      console.dir(id);
      next();
    }
    smartPing.startPing(id, callback, 7500);
  }

  $scope.stopPing = function (id) {
    smartPing.stopPing(id)
  }


})