(function () {
  let myApp = angular.module("myApp", [])
  myApp.controller("myController", function () {
    let login = this;
  })
})();

function myFunction() { 
  var x = document.getElementById("password"); 
  if (x.type === "password") { 
      x.type = "text"; 
  } 
  else { 
      x.type = "password"; 
  } 
} 