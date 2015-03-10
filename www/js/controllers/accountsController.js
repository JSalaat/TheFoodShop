/**
 * Created by M.JUNAID on 2015-03-10.
 */

foodShop.controller('accountsController', function($scope, $ionicPopup) {

        var ref = new Firebase("https://foodpanda-mcc201.firebaseio.com/");

        var myUser = localStorage.getItem('firebase:session::foodpanda-mcc201');
        $scope.myUser = JSON.parse(myUser);

        $scope.user = {
            email : '',
            passwaord: '',
            data: ''
        };

        $scope.register = function () {

            ref.createUser({
                email    : $scope.user.email,
                password : $scope.user.password
            }, function(error) {
                if (error === null) {
                    console.log("User created successfully");


                    ref.authWithPassword({
                        email    : $scope.user.email,
                        password : $scope.user.password
                    }, function(error, authData) {
                        if (error) {
                            console.log("Login Failed!", error);
                        } else {
                            console.log("Authenticated successfully with payload:", authData);

                            function authDataCallback(authData) {
                                if (authData) {
                                    console.log("User " + authData.uid + " is logged in with " + authData.provider);
                                    $scope.myUser =  authData;
                                    $ionicPopup.alert({
                                        title: 'Register Success!',
                                        template: 'logged in as ' + $scope.myUser.password.email
                                    })
                                } else {
                                    console.log("User is logged out");
                                }
                            }
                            // Register the callback to be fired every time auth state changes
                            ref.onAuth(authDataCallback);
                        }
                    });

                } else {
                    console.log("Error creating user:", error);
                }
            })

        };

        $scope.login = function () {

            ref.authWithPassword({
                email    : $scope.user.email,
                password : $scope.user.password
            }, function(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    console.log("Authenticated successfully with payload:", authData);

                    function authDataCallback(authData) {
                        if (authData) {
                            console.log("User " + authData.uid + " is logged in with " + authData.provider);
                            $scope.myUser =  authData;
                            $ionicPopup.alert({
                                title: 'Login Success!',
                                template: 'logged in as ' + $scope.myUser.password.email
                            })
                        } else {
                            console.log("User is logged out");
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
        };


        $scope.logout = function () {
            $scope.user = {};
            $scope.myUser = {};
            localStorage.clear();
            ref.unauth();

        };

        $scope.fb = function () {
            ref.authWithOAuthPopup("facebook", function(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    console.log("Authenticated successfully with payload:", authData);

                }
            });
        };


    }
);