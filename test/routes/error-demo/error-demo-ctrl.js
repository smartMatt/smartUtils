smartDemo.controller('ErrorDemoCtrl', function($scope, $http) {
  $scope.throwAjaxError = function () {
    $http.get("http://127.0.0.1:3000/ajax-error").success(function() {

    })
  }

})