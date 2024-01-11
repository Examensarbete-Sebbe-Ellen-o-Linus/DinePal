import { Box, Container } from '@mantine/core';

import CheckoutForm from '../_components/checkoutForm/CheckoutForm';
import CheckoutSummary from '../_components/checkoutSummary/CheckoutSummary';
import classes from './page.module.scss';

export default function Checkout() {
  return (
    <Box className={classes.container}>
      <Box className={classes.imgContainer} />
      <Container className={classes.contentContainer}>
        <Box className={classes.content}>
          <CheckoutSummary />
          <CheckoutForm />
        </Box>
      </Container>
    </Box>
  );
}
