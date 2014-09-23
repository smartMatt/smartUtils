var smartModals = angular.module('smartModals', []);


smartModals.factory('smartModals', ['$modal', '$sce', function($modal, $sce) {
  return {
    error: function(options, config) {

      config = config || {};

      var template;
      var url = config.templateUrl || '/smart-modals/alert-modal.html';

      if(config.template) {
        url = null;
        template = config.template;
      }

      options.data = config.data || {};

      options.message = $sce.trustAsHtml(options.message);

      $modal.open({
        templateUrl: url,
        template: template,
        controller: function ($scope) {
          $scope.options = options;
        }
      }).result.then(function () {
            options.next();
          });
    },
    alert: function(options) {

      var url = options.templateUrl || '/bower_components/smart-utils/smart-modals/templates/alert-modal.html';
      options.message = $sce.trustAsHtml(options.message);

      $modal.open({
        templateUrl: url,
        controller: function ($scope) {
          $scope.options = options;
        }
      }).result.then(function () {
            options.next();
          });
    },
    confirm: function(options) {

      var url = options.templateUrl || '/bower_components/smart-utils/smart-modals/templates/confirm-modal.html';
      options.message = $sce.trustAsHtml(options.message);
      options.closeClass = options.closeClass || "btn btn-success";
      options.close = options.close || "Yes";
      options.dismiss = options.dismiss || "Close";

      $modal.open({
        templateUrl: url,
        controller: function ($scope) {
          $scope.options = options;
        }
      }).result.then(function () {
            options.next();
          });
    }
  }

}]);