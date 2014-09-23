

var smartDirectives = angular.module('smartDirectives', []);


smartDirectives.directive('fileInput', function() {
  return {
    restrict: 'A',
    priority: -1,

    link: function (scope, iElement, iAttrs, ctrls) {

      var showEl = iAttrs.fileShow,
          array = iAttrs.fileArray,
          obj = iAttrs.fileObj,
          findby = iAttrs.fileFindby;

      if(findby) {
        findby = findby.split(',');
      }

      function fileChange () {

        var filename = iElement.val(),
            slash = (filename.lastIndexOf('\\')) + 1;

        filename = filename.slice(slash++, filename.length);

        scope.$apply(function() {
          if (array && findby) {
            for(var i=0; i<scope[array].length; i++ ){
              if(scope[array][i][findby[0]] == findby[1]) {
                scope[array][i][showEl] = filename;
                break;
              }
            }
          } else if (array) {
            scope[array][scope.$index][showEl] = filename;
          } else if (obj) {
            scope[obj][showEl] = filename;
          } else {
            scope[showEl] = filename;
          }
        })
      }

      iElement.bind('change', fileChange);

    }
  }

})


smartDirectives.directive('fileRemove', function() {
  return {
    restrict: 'A',
    priority: -1,
    link: function (scope, iElement, iAttrs, ctrls) {

      var showEl = iAttrs.fileShow,
          array = iAttrs.fileArray,
          fileId = iAttrs.fileId,
          obj = iAttrs.fileObj,
          findby = iAttrs.fileFindby;

      if(findby) {
        findby = findby.split(',');
      }

      function removeFile () {
        angular.element('#' + fileId).val("");
        scope.$apply(function () {
          if (array && findby) {
            for(var i=0; i<scope[array].length; i++ ){
              if(scope[array][i][findby[0]] == findby[1]) {
                scope[array][i][showEl] = "";
                break;
              }
            }

          } else if(array) {
            scope[array][scope.$index][showEl] = "";
            if(scope[array].length > 1) {
              scope[array].splice(scope.$index, 1);
            }

          } else if (obj) {
            scope[obj][showEl] = "";
          } else {
            scope[showEl] = "";
          }

        })
      }

      iElement.bind('click', removeFile);

    }
  }

})


smartDirectives.directive('multipleEmails', function () {
  var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i;

  function validateAll(ctrl, validatorName, value) {
    var split;
    if(_.indexOf(value, ';') > -1) {
      split = ';';
    }
//    else {
//      split = ',';
//    }
    var validity = ctrl.$isEmpty(value) || value.split(split).every(
        function (email) {
          return EMAIL_REGEXP.test(email.trim());
        }
    );

    ctrl.$setValidity(validatorName, validity);
    return validity ? value : undefined;
  }

  return {
    restrict: 'A',
    require: 'ngModel',
    link: function postLink(scope, elem, attrs, modelCtrl) {
      function multipleEmailsValidator(value) {
        return validateAll(modelCtrl, 'multipleEmails', value);
      };

      modelCtrl.$formatters.push(multipleEmailsValidator);
      modelCtrl.$parsers.push(multipleEmailsValidator);
    }
  };
});