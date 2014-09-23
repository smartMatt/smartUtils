var smartDemo = angular.module('smartDemo', ['ngRoute', 'ui.bootstrap', 'smartErrors', 'smartModals', 'smartForms', 'smartDirectives']);


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
  }).when('/directive-demo', {
    controller: 'DirectiveDemoCtrl',
    templateUrl: 'routes/directive-demo/directive-demo.html'
  })

}])