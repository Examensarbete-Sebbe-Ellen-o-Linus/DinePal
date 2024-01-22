import { Box, Container, Title } from '@mantine/core';

import { fetchCheckoutPageData } from '~/server/sanity/sanity.utils';
import CheckoutForm from '../_components/checkoutForm/CheckoutForm';
import CheckoutSummary from '../_components/checkoutSummary/CheckoutSummary';
import classes from './page.module.scss';

export default async function Checkout() {
  const checkoutPageData = await fetchCheckoutPageData();
  const { checkoutImg, title } = checkoutPageData;

  return (
    <Box className={classes.container}>
      <Box
        className={classes.imgContainer}
        style={{ backgroundImage: `url(${checkoutImg?.url})` }}
      ></Box>
      <Container className={classes.contentContainer}>
        <Box className={classes.content}>
          <Box className={classes.titleSummary}>
            <Title mt={'48px'} order={2}>
              {title}
            </Title>
            <Title order={6}>
              Du tilldelas ett <strong>ordernummer</strong> när din beställning
              är klar. Uppge detta vid upphämtning.
            </Title>
            <CheckoutSummary />
          </Box>
          <CheckoutForm />
        </Box>
      </Container>
    </Box>
  );
}
