var smartDemo = angular.module('smartDemo', ['ngRoute', 'ui.bootstrap', 'smartErrors', 'smartModals', 'smartForms']);


smartDemo.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/', {
    controller: 'DashboardCtrl',
    templateUrl: 'routes/dashboard/dashboard.html'
  }).when('/form-demo', {
    controller: 'FormDemoCtrl',
    templateUrl: 'routes/form-demo/form-demo.html'
  }).when('/modal-demo', {
    controller: 'ModalDemoCtrl',
    templateUrl: 'routes/modal-demo/modal-demo.html'
  })

}])