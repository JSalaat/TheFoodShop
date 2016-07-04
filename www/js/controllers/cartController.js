/**
 * Created by M.JUNAID on 2015-03-10.
 */

foodShop.controller('cartController', function($scope, cartFactory, $cordovaToast) {

    $scope.cart = cartFactory.getCartData();
    $scope.total = getTotal();

    function getTotal (){
        var total = 0;
        $scope.cart.forEach(function (item) {
            if(item.price){
                total = total + item.price;
            }
        });
        return total
    }

    $scope.removeItem = function(index){
        cartFactory.removeItem(index);
        $scope.total = getTotal();
    };

    $scope.showTotals = function(){
        $cordovaToast.show('Your Total is '+$scope.total, 'long', 'bottom')
            .then(function(success) {
                // success
            }, function (error) {
                // error
            });
    }

});

