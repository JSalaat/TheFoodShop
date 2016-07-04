/**
 * Created by M.JUNAID on 2015-03-10.
 */

foodShop.controller('accountsController', function($scope, $ionicPopup, $ionicLoading, userFactory) {

        $scope.user = {};
        $scope.myUser = userFactory.getAuthData();

        $scope.register = function (user) {

            if (user.email && user.password){

                $scope.show();
                userFactory.createUser(user)
                    .then(function () {
                        console.log('user created');
                        $scope.login(user);
                        $scope.hide();
                    }, function (error) {
                        console.log('user creation error', error);
                        $scope.hide();
                    })
            }
            else{
                $ionicPopup.alert({
                    title: 'Invalid Parameters',
                    template: 'Please fill both Fields above.'
                })
            }

        };

        $scope.login = function (user) {

            if (user.email && user.password) {

                $scope.show();
                userFactory.login(user)
                    .then(function (data) {
                        console.log('user logged in', data);
                        $scope.myUser = userFactory.getAuthData();
                        $scope.hide();
                    }, function (error) {
                        console.log('user login error', error);
                        $scope.hide();
                    })
            }
            else{
                $ionicPopup.alert({
                    title: 'Invalid Parameters',
                    template: 'Please fill both Fields above.'
                })
            }
        };


        $scope.logout = function () {
            $scope.user = {};
            userFactory.logout();
            $scope.myUser = userFactory.getAuthData();
        };

        $scope.fb = function () {
            $scope.show();
            userFactory.loginWithFb()
                .then(function (data) {
                    console.log('user fb logged in', data);
                    $scope.myUser = userFactory.getAuthData();
                    $scope.hide();
                }, function (error) {
                    console.log('user fb login error', error);
                    $scope.hide();
                })
        };

        $scope.show = function() {
            $ionicLoading.show({
                template: '<img src="img/output_LoXQFP.gif">'
            });
        };

        $scope.hide = function(){
            $ionicLoading.hide();
        };

    }
);