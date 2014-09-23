// Code goes here

angular.module('smartValidation').factory('formService', function($modal) {

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