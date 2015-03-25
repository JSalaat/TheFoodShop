/**
 * Created by M.JUNAID on 2015-03-10.
 */

foodShop.controller('accountsController', function($scope, $ionicPopup,$ionicLoading) {

        var ref = new Firebase("https://foodpanda-mcc201.firebaseio.com/");

        $scope.show = function() {
            $ionicLoading.show({
                template: '<img src="img/output_LoXQFP.gif">'
            });
        };

        $scope.hide = function(){
            $ionicLoading.hide();
        };

        var myUser = localStorage.getItem('firebase:session::foodpanda-mcc201');
        $scope.myUser = JSON.parse(myUser);

        $scope.user = {
            email : '',
            passwaord: '',
            data: ''
        };

        $scope.register = function () {

            if ($scope.user.email && $scope.user.password){

                $scope.show();

            ref.createUser({
                email: $scope.user.email,
                password: $scope.user.password
            }, function (error) {
                if (error === null) {
                    console.log("User created successfully");

                    ref.authWithPassword({
                        email: $scope.user.email,
                        password: $scope.user.password
                    }, function (error, authData) {
                        if (error) {
                            console.log("Login Failed!", error);
                            $scope.hide()
                        } else {
                            console.log("Authenticated successfully with payload:", authData);
                            $scope.hide()


                            function authDataCallback(authData) {
                                if (authData) {
                                    console.log("User " + authData.uid + " is logged in with " + authData.provider);
                                    $scope.myUser = authData;
                                    $scope.hide()
                                    $ionicPopup.alert({
                                        title: 'Register Success!',
                                        template: 'logged in as ' + $scope.myUser.password.email
                                    })
                                } else {
                                    console.log("User is logged out");
                                    $scope.hide()
                                }
                            }

                            // Register the callback to be fired every time auth state changes
                            ref.onAuth(authDataCallback);
                        }
                    });

                } else {
                    $scope.hide();
                    console.log("Error creating user:", error);
                    $ionicPopup.alert({
                        title: 'Error creating user!',
                        template: error
                    })
                }
            })
        }
            else{
                $ionicPopup.alert({
                    title: 'Invalid Parameters',
                    template: 'Please fill both Fields above.'
                })
            }

        };

        $scope.login = function () {

            if ($scope.user.email && $scope.user.password) {

                $scope.show();

                ref.authWithPassword({
                    email: $scope.user.email,
                    password: $scope.user.password
                }, function (error, authData) {
                    if (error) {
                        console.log("Login Failed!", error);
                        $ionicPopup.alert({
                            title: 'Login Failed!',
                            template: error
                        })
                        $scope.hide()
                    } else {
                        console.log("Authenticated successfully with payload:", authData);
                        $scope.hide()

                        function authDataCallback(authData) {
                            if (authData) {
                                console.log("User " + authData.uid + " is logged in with " + authData.provider);
                                $scope.myUser = authData;
                                $scope.hide()
                                $ionicPopup.alert({
                                    title: 'Login Success!',
                                    template: 'logged in as ' + $scope.myUser.password.email
                                })
                            } else {
                                console.log("User is logged out");
                                $scope.hide()
                            }
                        }

                        // Register the callback to be fired every time auth state changes
                        ref.onAuth(authDataCallback);

                        var authdata = ref.getAuth();

                        if (authdata) {
                            console.log("User " + authdata.uid + " is logged in with " + authdata.provider);
                        } else {
                            console.log("User is logged out");
                        }
                    }
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
            $scope.myUser = {};
            localStorage.clear();
            ref.unauth();

        };

        $scope.fb = function () {
            $scope.show();
            ref.authWithOAuthPopup("facebook", function(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                    $scope.hide()
                } else {
                    console.log("Authenticated successfully with payload:", authData);
                    $scope.hide();
                    $scope.myUser = authData;

                }
            });
        };


    }
);