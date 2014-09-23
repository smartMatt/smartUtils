

// todo replace with info from server
var debug = 1;
var collectionName = 'almsr-dev';


// catch errors that occur at runtime
window.onerror = errFunc;
function errFunc (msg, url, line) {
  if(debug == 2) {
    alert(msg)
  } else {
    console.dir(msg);
  }
  var error = {
    msg: msg,
    url: url,
    line: line
  }

  // post error to server

}


var smartErrors = angular.module('smartErrors', ['smartModals']).config(function($httpProvider) {
  $httpProvider.interceptors.push('smartInterceptor')
})

smartErrors.factory('smartInterceptor', ['$q', '$rootScope', '$injector', function($q, $rootScope, $injector) {

  var requestInterceptor = {
    requestError: function(response) {
      var smartLog = $injector.get('smartLog');
      var options = {
        title: "Server Error"
      }

      var config = {
        data: {
          status: response.status,
          url: response.config.url,
          method: response.config.method
        }
      }

      response.errorType = "httpRequestError";
      response.currentUrl = document.URL;

      smartLog.httpError(response, options, config);
      return $q.reject(response);
    },
    responseError: function(response) {
      var smartLog = $injector.get('smartLog');

      var options = {
        title: "Server Error"
      }
      var config = {
        data: {
          status: response.status,
          url: response.config.url,
          method: response.config.method
        }
      }

      response.errorType = "httpResponseError";
      response.currentUrl = document.URL;

      smartLog.httpError(response, options, config);
      return $q.reject(response);
    }
  };

  return requestInterceptor;

}])

smartErrors.factory('$exceptionHandler', ['$injector', function($injector) {
  return function (exception) {
    var smartLog = $injector.get('smartLog');
    var error = {
      message: exception.message,
      stack:exception.stack,
      currentUrl: document.URL,
      errorType: "angularError"
    }
    smartLog.error(error);
  };
}]);


smartErrors.factory('smartLog', ['$http', 'smartModals', function($http, smartModals) {

  var log = function(error, options, config) {

    config = config || {};

    var currentDebug = config.debug > debug ? config.debug : debug;

    options = options || {}
    options.title = options.title || "Error";
    options.confirm = options.confirm || "OK";
    options.message = options.message || "There was an error processing your request";

    if (currentDebug == 2) {
      smartModals.error(options, config);
    } else if (currentDebug == 1) {
      smartModals.error(options)
    }

    var browser = {
      browser: navigator.sayswho,
      cookieEnabled: navigator.cookieEnabled,
      platform: navigator.platform,
      product: navigator.product,
      productSub: navigator.productSub,
      userAgent: navigator.userAgent,
      vendor: navigator.vendor
    }

    var postObject = {
      browser: browser,
      error: error
    }



    $http.post('/errors/' + collectionName, postObject).success(function(data) {
      console.dir(data);
    });

    console.dir(error);
  }



  var windowError = function (error) {
    log(error)
  }

  window.onerror = windowError;

  return {
    httpError: function (response, options, config) {
      if (response.status == 400 || response.status >= 500) {
        this.log(response, options, config);
      }
    },
    error: function (exception, options, config) {
      this.log(exception, options, config);
    },
    log: log
  }

}])

// function to return user browser

navigator.sayswho= (function(){
  var ua= navigator.userAgent, tem,
      M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  if(/trident/i.test(M[1])){
    tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
    return 'IE '+(tem[1] || '');
  }
  if(M[1]=== 'Chrome'){
    tem= ua.match(/\bOPR\/(\d+)/)
    if(tem!= null) return 'Opera '+tem[1];
  }
  M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
  if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
  return M.join(' ');
})();


// handle ie no console

(function(con) {
  'use strict';
  var prop, method;
  var empty = {};
  var dummy = function() {};
  var properties = 'memory'.split(',');
  var methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
      'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' +
      'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');
  while (prop = properties.pop()) con[prop] = con[prop] || empty;
  while (method = methods.pop()) con[method] = con[method] || dummy;
})(this.console = this.console || {});