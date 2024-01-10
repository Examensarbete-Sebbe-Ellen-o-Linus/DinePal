import CheckoutForm from '../_components/checkoutForm/CheckoutForm';

import { Box, Container } from '@mantine/core';
import CheckoutCard from '../_components/checkoutCard/CheckoutCard';
import classes from './page.module.scss';

export default function Checkout() {
  return (
    <>
      <h1>Checkout</h1>
      <Container className={classes.container}>
        <Box>
          <CheckoutCard />
          <CheckoutForm />
        </Box>
        <Box className={classes.imgContainer} />
      </Container>
    </>
  );
}
