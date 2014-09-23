// Code goes here

var smartForms = angular.module('smartForms', [])


smartForms.factory('smartForms', function() {

  return {
    showError: function (model, field) {
      if(!field) {
        return (model.$invalid && (model.$dirty || model.submitted));
      }
      return (model.$error[field] && (model.$dirty || model.submitted))
    },

    validateForm: function (form) {
      if (form.$valid) {
        return true;
      }
      angular.forEach(form, function (value, key) {
        if (key.indexOf('$') == -1) {
          form[key].submitted = true;
        }
      })
      return false;
    }
  }
});