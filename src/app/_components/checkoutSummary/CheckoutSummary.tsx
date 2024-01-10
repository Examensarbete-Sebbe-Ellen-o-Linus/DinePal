import { Box, Text } from '@mantine/core';

import CheckoutCard from '../checkoutCard/CheckoutCard';
import classes from './CheckoutSummary.module.scss';

interface ICheckoutSummary {
  totalPrice: number;
}

export default function CheckoutSummary({ totalPrice }: ICheckoutSummary) {
  function formatPrice(price: number): string {
    return price.toLocaleString('sv-SE');
  }
  return (
    <Box className={classes.container}>
      <CheckoutCard itemCount={0} price={0} />

      <Box className={classes.totalPrice}>
        <Text>Totalt</Text>
        <Text>
          <strong>{formatPrice(totalPrice)} :-</strong>
        </Text>
      </Box>
    </Box>
  );
}
