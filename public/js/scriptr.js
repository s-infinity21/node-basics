var myApp = angular.module('myApp', [])
myApp.controller('myController', function ($scope) {
  console.log($scope)
  let registration = this;
  $('#form__span__error__confirmpassword').hide();
  $('#form__span__errors--name').hide();
  registration.nameValidate = function () {
    let name = registration.name;
    if (!isNaN(name)) {
      $('#form__name').addClass("error__border");
      $('#form__name').focus();
      $('#form__span__errors--name').show();
      $scope.registrationForm.$invalid = true;
      // $('#btn').prop("disabled", "disabled");
      // } else if (name.length < 2 && name.length > 10) {
    } else if (name.length < 2 || name.length > 10) {
      $('#form__name').addClass("error__border");
      $('#form__name').focus();
      $('#form__span__errors--name').show();
      $scope.registrationForm.$invalid = true;
      // $('#btn').prop("disabled", "disabled");
    } else {
      $('#form__name').removeClass("error__border");
      $('#form__span__errors--name').hide();
      $('#form__name').focusout();
      $scope.registrationForm.$invalid = false;
    }
  }
  registration.confirmPassword = function () {
    let confirmpass = registration.confirmpassword;
    let pass = registration.password;
    if (confirmpass != pass) {
      $('#form__span__error__confirmpassword').show();
      $('#confirm-password').addClass("error__border");
      $('#form__span__error__confirmpassword').focus();
      $scope.registrationForm.$invalid = true;
      console.log($scope)
    } else {
      $('#confirm-password').removeClass("error__border");
      $('#form__span__error__confirmpassword').hide();
      $('#confirm-password').focusout();
      $scope.registrationForm.$invalid = false;
      // $('#btn').prop("disabled", false);
    }
  }
})