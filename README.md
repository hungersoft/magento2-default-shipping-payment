![Hungersoft.com](https://www.hungersoft.com/skin/front/custom/images/logo.png)

# Default Shipping & Payment Method [M2]
**hs/module-default-shipping-payment**

Hungersoft's [Default Shipping & Payment Method](https://www.hungersoft.com/p/magento2-product-default-shipping-payment) extension allows to pre-select default shipping and/or payment method in your Magento 2 admin.

## Installation

```sh
composer config repositories.hs-module-all vcs https://github.com/hungersoft/module-all.git
composer config repositories.hs-module-default-shipping-payment vcs https://github.com/hungersoft/magento2-default-shipping-payment.git
composer require hs/module-default-shipping-payment:dev-master

php bin/magento module:enable HS_All HS_DefaultShippingPayment
php bin/magento setup:upgrade
```

**Note:** Make sure you've installed our Base extension. The above commands already include it, but if you haven't, you can find it [here](https://github.com/hungersoft/module-all)

## Support

Magento 2 Default Shipping & Payment Method extension is provided for free by Hungersoft. Feel free to contact Hungersoft at support@hungersoft.com if you are facing any issues with this extension. Reviews, suggestions and feedback will be greatly appreciated.
