smartDemo.controller('PingDemoCtrl', function ($scope, smartPing) {

  $scope.counters = {};
  $scope.show = {};

  $scope.startPing = function (id) {


    $scope.counters[id] = $scope.counters[id] || 0;
    $scope.show[id] = true;

    smartPing.start(id, callback, 1000);

    function callback (next) {
      $scope.counters[id] ++;
      next();
    }

  }

  $scope.stopPing = function (id) {
    smartPing.stop(id)
    $scope.show[id] = false;

  }


})