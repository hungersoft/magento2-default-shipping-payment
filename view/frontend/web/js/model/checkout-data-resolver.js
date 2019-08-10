define([
    'underscore',
    'mage/utils/wrapper',
    'Magento_Checkout/js/checkout-data',
    'Magento_Checkout/js/model/payment-service',
    'Magento_Checkout/js/action/select-shipping-method',
    'Magento_Checkout/js/action/select-payment-method'
],function (_, wrapper, checkoutData, paymentService, selectShippingMethodAction, selectPaymentMethodAction) {
    'use strict';

    return function (checkoutDataResolver) {
        var config = window.checkoutConfig;

        /**
         * Selects a shipping method if a shipping method hasn't already been selected and,
         * the configured autoselect or fallback shipping method exists.
         */
        var resolveShippingRates = wrapper.wrap(
            checkoutDataResolver.resolveShippingRates,
            function (originalResolveShippingRates, ratesData) {
                if (!checkoutData.getSelectedShippingRate()
                    && !_.isUndefined(config.hsDefaultShippingPayment.shipping)
                    && _.size(ratesData) > 1
                ) {
                    var method = this.getMethod('shipping', ratesData);
                    if (!_.isUndefined(method)) {
                        selectShippingMethodAction(method);
                    }
                }

                return originalResolveShippingRates(ratesData);
            }
        );

        /**
         * Selects a payment method if a payment method hasn't already been selected and,
         * the configured autoselect or fallback payment method exists.
         */
        var resolvePaymentMethod = wrapper.wrap(
            checkoutDataResolver.resolvePaymentMethod,
            function (originalResolvePaymentMethod) {
                var availablePaymentMethods = paymentService.getAvailablePaymentMethods();
                if (!checkoutData.getSelectedPaymentMethod()
                    && !_.isUndefined(config.hsDefaultShippingPayment.payment)
                    && _.size(availablePaymentMethods) > 1
                ) {
                    var method = this.getMethod('payment', availablePaymentMethods);
                    if (!_.isUndefined(method)) {
                        selectPaymentMethodAction(method);
                    }
                }
                return originalResolvePaymentMethod();
            }
        )

        return _.extend(checkoutDataResolver, {
            resolveShippingRates: resolveShippingRates,
            resolvePaymentMethod: resolvePaymentMethod,

            /**
             * Return a selectable method
             *
             * @param  {String} type
             * @param  {Array} availableMethods
             * @return {Object|undefined}
             */
            getMethod: function (type, availableMethods) {
                var autoselectMethod = this.getAutoselectMethod(type),
                    self = this;
                var matchedMethod;
                if (!_.isUndefined(autoselectMethod)) {
                    matchedMethod = availableMethods.find(function (method) {
                        return self.getMethodCode(method, type) === autoselectMethod;
                    });
                }

                if (!matchedMethod) {
                    var fallbackMethod = this.getFallbackMethod(type);
                    if (fallbackMethod === 'first') {
                        matchedMethod = availableMethods[0];
                    } else if (fallbackMethod === 'last') {
                        matchedMethod = availableMethods[availableMethods.length - 1];
                    } else if (fallbackMethod === 'lowest_price') {
                        matchedMethod = _.min(availableMethods, function (method) {
                            return method.amount;
                        });
                    }
                }

                return matchedMethod;
            },

            /**
             * Get auto-select method by type
             *
             * @param  {String} type
             * @return {String}
             */
            getAutoselectMethod: function (type) {
                return config.hsDefaultShippingPayment[type].autoselect;
            },

            /**
             * Get fallback method by type
             *
             * @param  {String} type
             * @return {String}
             */
            getFallbackMethod: function (type) {
                return config.hsDefaultShippingPayment[type].fallback;
            },

            /**
             * Get method code
             *
             * @param  {String} type
             * @return {String}
             */
            getMethodCode: function (method, type) {
                return type === 'shipping' ? method.carrier_code + '_' + method.method_code : method.method;
            }
        });
    };
});
