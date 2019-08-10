<?php
/**
 * @category  HS
 *
 * @copyright Copyright (c) 2015 Hungersoft (http://www.hungersoft.com)
 * @license   http://www.hungersoft.com/license.txt Hungersoft General License
 */

namespace HS\DefaultShippingPayment\Model\Config\Source;

class FallbackMethodShipping extends FallbackMethod
{
    const LOWEST_PRICE = 'lowest_price';

    /**
     * Key-value pair of description options.
     *
     * @return array
     */
    public function toArray()
    {
        return array_merge(parent::toArray(), [
            self::LOWEST_PRICE => __('Lowest Price'),
        ]);
    }
}
