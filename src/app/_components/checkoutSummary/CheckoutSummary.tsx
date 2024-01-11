'use client';
import { Box, Text } from '@mantine/core';

import { useCart } from 'context/cartContext';
import CheckoutCard from '../checkoutCard/CheckoutCard';
import classes from './CheckoutSummary.module.scss';

export default function CheckoutSummary() {
  const { cartState, cartPrice } = useCart();

  function formatPrice(price: number): string {
    return price.toLocaleString('sv-SE');
  }
  return (
    <Box className={classes.container}>
      {cartState.map((item, index) => (
        <CheckoutCard key={index} item={item} />
      ))}

      <Box className={classes.totalPrice}>
        <Text>Totalt</Text>
        <Text>
          <strong>{formatPrice(cartPrice)} :-</strong>
        </Text>
      </Box>
    </Box>
  );
}