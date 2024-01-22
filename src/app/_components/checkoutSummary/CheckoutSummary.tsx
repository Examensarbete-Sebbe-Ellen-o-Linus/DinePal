'use client';
import { Box, Text } from '@mantine/core';

import { useCart } from 'context/cartContext';
import { formatPrice } from '~/app/formatPrice';
import CheckoutCard from '../checkoutCard/CheckoutCard';
import classes from './CheckoutSummary.module.scss';

export default function CheckoutSummary() {
  const { cartState, cartPrice } = useCart();

  return (
    <Box className={classes.container}>
      {cartState.map((item, index) => (
        <CheckoutCard key={index} item={item} />
      ))}

      <Box className={classes.totalPrice}>
        <Text>Totalt</Text>
        <Text>
          <strong>{formatPrice(cartPrice)}:-</strong>
        </Text>
      </Box>
    </Box>
  );
}
