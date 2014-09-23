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

  $scope.customModal = function () {

    var options = {
      templateUrl: "./routes/modal-demo/custom-modal.html",
      title: "Custom Modal",
      message: "All modals can use <b>Html tags</b> in the <i>message</i> attribute.",
      customAttribute: "This is a new attribute not present on standard templates.",
      closingMessage: "Callback functions can be assigned to the next attribute.",
      close: "Ok",
      next: function () {
        alert('Do callback stuff here!')
      }
    }

    smartModals.confirm(options)

  }


})