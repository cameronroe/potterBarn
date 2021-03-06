'use strict';

angular.module('potterBarnApp')
  .controller('SignupCtrl', function ($scope, Auth, $location, $window, $cookieStore, $http, $q) {
    $scope.cookieCart = $cookieStore.get('cart') || [];
    $scope.user = {};
    $scope.errors = {};

$scope.check = function(){
      if($scope.wizard !== "dumbledore"){
        window.alert('WARNING \n MUGGLES PROCEED AT YOUR OWN RISK');
        window.location.replace("http://potterybarn.com");
      }
        else{
    $scope.register = function(form) {
      $scope.submitted = true;
      var user;
      if(form.$valid) {
        var deferred = $q.defer();
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function(user) {
          console.log(user);
           $http.get('/api/cart/new_cart/' + user._id).success(function(user_cart){
            console.log($scope.cookieCart.length);
            if ( $scope.cookieCart.length > 0 ) {
              $scope.cart = user_cart;
              for ( var i = 0; i < $scope.cookieCart.length; i++ ) {
                  $scope.cart.products.push($scope.cookieCart[i]);
              }
            } else {
              $scope.cart = user_cart;
            }
          });

          // Account created, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        })
      }
    };

      }
    }

    var myFunction = function() {
      $location.path('/warning');
      setTimeout(function(){ $location.path('/warning'); }, 3000);
      debugger;
    }

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
