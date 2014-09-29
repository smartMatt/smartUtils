var smartDemo = angular.module('smartDemo', ['ngRoute', 'ui.bootstrap', 'smartErrors', 'smartModals', 'smartForms', 'smartDirectives', 'smartPing']);


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
  }).when('/ping-demo', {
    controller: 'PingDemoCtrl',
    templateUrl: 'routes/ping-demo/ping-demo.html'
  })

}])


smartDemo.config(['$httpProvider', '$injector', function ($httpProvider, $injector) {
  var smartErrors = $injector.get('smartErrors');

  var config = {
    masterDebug: 0,
    collectionName: 'almsr-dev',
    url: 'http://127.0.0.1:3000',
    requestInterceptor: {
      options: {
        title: "Title goes here"
      },
      config: {
        debug: 1
      }
    },

    responseInterceptor: {
      options: {
        title: "Title goes here"
      },
      config: {
        debug: 1
      }
    },

    errorInterceptor: {
      debug: 1
    }
  }
  smartErrors.smartConfig(config);

}])