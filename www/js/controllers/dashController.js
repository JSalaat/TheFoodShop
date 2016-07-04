/**
 * Created by M.JUNAID on 2015-03-10.
 */

foodShop.controller('dashController',function($scope, $ionicPopup, $ionicLoading, userFactory, dataFactory, $state) {

    $scope.user = userFactory.getAuthData();
    console.log($scope.user);

    if($scope.user){


        $scope.restaurants = dataFactory.getRestData();
        console.log($scope.restaurants);

        $scope.show = function() {
            $ionicLoading.show({
                template: '<img src="img/output_LoXQFP.gif">'
            });
        };
        $scope.hide = function(){
            $ionicLoading.hide();
        };

        $scope.show();

        $scope.restaurants.$loaded().then(function() {
            $scope.hide();
        });

    }
    else{
        $ionicPopup.alert({
            title: "No User",
            template: "You're not Signed In, Please Sign In Or Register"
        });
        $state.go('tab.account')
    }


});
