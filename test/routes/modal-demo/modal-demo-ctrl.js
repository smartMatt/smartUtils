smartDemo.controller('ModalDemoCtrl', function($scope, smartModals) {



  $scope.alertModal = function () {

    var options = {
      title: "Alert Modal",
      message: "Warning this is an alert.",
      close: "Ok"
    }

    smartModals.alert(options);

  }


  $scope.confirmModal = function () {

    var options = {
      title: "Confirm Modal",
      message: "Do you approve this modal?",
      close: "Yes",
      dismiss: "No"
    }

    smartModals.confirm(options)

  }


})