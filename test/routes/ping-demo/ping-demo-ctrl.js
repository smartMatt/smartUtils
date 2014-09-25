smartDemo.controller('PingDemoCtrl', function ($scope, smartPing) {


  $scope.startPing = function (id) {
    function callback (next) {
      console.dir(id);
      next();
    }
    smartPing.start(id, callback, 3000);
  }

  $scope.stopPing = function (id) {
    smartPing.stop(id)
  }


})