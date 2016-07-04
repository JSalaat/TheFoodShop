/**
 * Created by M.JUNAID on 2015-03-10.
 */

foodShop.controller('restNameController', function($scope, $ionicPopup, $state, $stateParams, dataFactory, cartFactory) {

    $scope.selectedRes = dataFactory.getSelectedRestData($stateParams.id);

    $scope.addToCart = function(i){
        cartFactory.addCartItem($scope.selectedRes.item[i]);
        $ionicPopup.alert({
            title: 'Successfully added to Cart!',
            template: $scope.selectedRes.item[i].dish_n
        });
    };

    $scope.changeState = function(){
        $state.go('tab.cart')
    }
});
