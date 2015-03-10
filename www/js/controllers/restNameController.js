/**
 * Created by M.JUNAID on 2015-03-10.
 */

foodShop.controller('restNameController', function($scope, $rootScope, $ionicPopup, $state,$stateParams) {

        //console.log($rootScope.restaurants);

        $scope.restaurantsdata = $rootScope.restaurants;

        //var id = window.location.hash.substr(11);
        var id = $stateParams;
        console.log($stateParams)

        var allRestaurants = $rootScope.restaurants;


        $scope.selectedRes = null;

        for(var i = 0 ; i < allRestaurants.length ; i++) {
            if(id.name == allRestaurants[i].id){
                $scope.selectedRes = allRestaurants[i];
                console.log($scope.selectedRes)
            }
        }


        $rootScope.addtocart= function(i){
            $rootScope.cart.push( $scope.selectedRes.item[i]);
            $ionicPopup.alert({
                title: 'Successfully added to Cart!',
                template: $scope.selectedRes.item[i].dish_n
            });
            console.log($scope.selectedRes.item[i])
        };

        $scope.changeState = function(){
            $state.go('tab.cart')
        }
    })
