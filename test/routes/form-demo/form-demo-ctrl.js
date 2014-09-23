smartDemo.controller('FormDemoCtrl', function($scope, smartForms) {
  $scope.customer = {};

  $scope.showError = smartForms.showError;
  $scope.validateForm = smartForms.validateForm;

  $scope.genderOptions = ["Male", "Female", "Other"];

  $scope.saveCustomer = function(customer) {
    console.dir(customer);
    alert('Form is valid. Now post to server');
  }

})