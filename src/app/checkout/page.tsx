import { Box, Container } from '@mantine/core';

import CheckoutForm from '../_components/checkoutForm/CheckoutForm';
import CheckoutSummary from '../_components/checkoutSummary/CheckoutSummary';
import classes from './page.module.scss';

export default function Checkout() {
  return (
    <>
      <h1>Checkout</h1>
      <Container className={classes.container}>
        <Box>
          <CheckoutSummary totalPrice={1000} />
          <CheckoutForm />
        </Box>
        <Box className={classes.imgContainer} />
      </Container>
    </>
  );
}
