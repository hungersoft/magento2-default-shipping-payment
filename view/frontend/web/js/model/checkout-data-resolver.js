define([
    'underscore',
    'Magento_Checkout/js/checkout-data',
    'Magento_Checkout/js/action/select-shipping-method',
    'Magento_Checkout/js/action/select-payment-method'
],function (_, checkoutData, selectShippingMethodAction, selectPaymentMethodAction) {
    'use strict';

    var mixin = {
        resolveShippingRates: function (ratesData) {

        },
        resolvePaymentMethod: function () {

        }
    };

    return function (newCheckoutDataResolver) {
        return newCheckoutDataResolver.extend(mixin);
    };
});
