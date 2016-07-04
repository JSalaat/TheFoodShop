/**
 * Created by mjunaidsalaat on 6/24/16.
 */

foodShop.factory('dataFactory', function($q, $firebaseArray) {

    var ref = new Firebase("https://foodpanda-mcc201.firebaseio.com/");
    var messagesRef = ref.child("restuarants/-Jh39v_3eydHBVdSYWBU");
    var restData = $firebaseArray(messagesRef);

    return {
        getRestData : function () {
            return restData;
        },

        getSelectedRestData : function (id) {
            return restData.find(function (item) {
                return item.id == id;
            });
        }
    }
});