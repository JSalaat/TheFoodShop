/**
 * Created by mjunaidsalaat on 6/24/16.
 */

foodShop.factory('cartFactory', function($q, $firebaseObject) {

    var cart = [];

    return {
        getCartData : function () {
            return cart;
        },

        addCartItem : function (cartItem) {
            cart.push(cartItem);
        },

        removeItem : function (index) {
            cart.splice(index,1);
        }
    }
});