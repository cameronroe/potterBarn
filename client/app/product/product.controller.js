'use strict';

angular.module('potterBarnApp')
  .controller('ProductCtrl', function ($scope, $http, $stateParams, $state, Auth, cart, sickles, $cookieStore) {
    // first time user. dont have a cart yet
    // get the cart from cookie, if it is undefined, then make cart
    $scope.cookieCart = $cookieStore.get('cart') || [];


    $scope.currentProduct = $stateParams.product;
    //'sickles' converts price to galleons and sickles
    $scope.sickles = sickles;

    $scope.addToCart = function(product, quantity) {
      if (!Auth.isLoggedIn()){
        $scope.cookieCart.push({'product': product, 'quantity_ordered': quantity});
        $cookieStore.put('cart', $scope.cookieCart);
        console.log($scope.cookieCart)
      }
      else {
      $http.get('api/cart/add/' + Auth.getCurrentUser()._id + '/' + $stateParams.product+ '/' + $scope.product.quantity_ordered)
        .success(function(product) { console.log('Yaaaay')
        });
      }
    };

    $http.get('/api/products/'+ $stateParams.product).success(function(product) {
      $scope.product = product;
      $scope.number = $scope.product.quantity;
    });

    $scope.getNumber = function(num) {
    return new Array(num);
    }
  });

