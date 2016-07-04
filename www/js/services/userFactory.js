/**
 * Created by mjunaidsalaat on 6/24/16.
 */

foodShop.factory('userFactory', function($q) {

    var ref = new Firebase("https://foodpanda-mcc201.firebaseio.com/");

    var _createUser = function (user) {

        var deferred = $q.defer();

        ref.createUser({
            email: user.email,
            password: user.password
        }, function (error) {
            if (error === null) {
                console.log("User created successfully");
                deferred.resolve();
            }
            else{
                deferred.reject(error);
            }
        });

        return deferred.promise;
    };

    var _login = function (user) {

        var deferred = $q.defer();

        ref.authWithPassword({
            email: user.email,
            password: user.password
        }, function (error, authData) {
            if (error) {
                console.log("Login Failed!", error);
                deferred.reject(error);

            } else {
                console.log("Authenticated successfully with payload:", authData);
                user = authData;
                deferred.resolve(authData);
            }
        });

        return deferred.promise;
    };


    var _getAuthData = function () {
        var authData = ref.getAuth();
        if (authData) {
            console.log("User " + authData.uid + " is logged in with " + authData.provider);
            return authData;
        } else {
            console.log("User is logged out");
            return authData;
        }
    };

    var _logout = function () {
        localStorage.clear();
        ref.unauth();
    };

    var _loginWithFb = function () {
        var deferred = $q.defer();

        ref.authWithOAuthPopup("facebook", function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
                deferred.reject(error);

            } else {
                console.log("Authenticated successfully with payload:", authData);
                user = authData;
                deferred.resolve(authData);
            }
        });

        return deferred.promise;
    };

    return {
        createUser: _createUser,
        getAuthData: _getAuthData,
        login: _login,
        loginWithFb: _loginWithFb,
        logout: _logout
    }

});
