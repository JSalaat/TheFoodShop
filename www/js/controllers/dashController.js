/**
 * Created by M.JUNAID on 2015-03-10.
 */

foodShop.controller('dashController',function($scope, $firebase , $rootScope, $ionicPopup, $state,$ionicLoading) {

    $scope.lsUser = localStorage.getItem('firebase:session::foodpanda-mcc201');
    $scope.user = JSON.parse($scope.lsUser);

    if($scope.user){

    var CON = new Firebase("https://foodpanda-mcc201.firebaseio.com/");
    var resRef = CON.child('restuarants/-Jh39v_3eydHBVdSYWBU');

    $rootScope.restaurants = $firebase(resRef).$asArray();
    console.log($rootScope.restaurants);

    $scope.show = function() {
        $ionicLoading.show({
            template: '<img src="img/output_LoXQFP.gif">'
        });
    };
    $scope.hide = function(){
        $ionicLoading.hide();
    };

    $scope.show();

    $rootScope.restaurants.$loaded().then(function() {
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


    /*$scope.newRest= {
        "name": "Dunkin Donuts",
        "address": "Karachi, Gulshan e Iqbal",
        "id": "004",
        "img": "data:image/jpg;base64,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",
        "rating": 38,
        "type": ['Beverages', 'Breakfast', 'Sandwiches'],
        "item": [
            {"dish_n": "Egg & Cheese", "price": 300},
            {"dish_n": "Spicy BBQ Chicken", "price": 300},
            {"dish_n": "Chicken Balogna", "price": 450},
            {"dish_n": "Lindt Shake", "price": 450},
            {"dish_n": "M&M’s Shake", "price": 350},
        ]
    };
    resRef.push($scope.newRest,function(){alert('done')})*/





})
