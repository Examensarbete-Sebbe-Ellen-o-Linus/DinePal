import { Box, Container, Text, Title } from '@mantine/core';

import type { Metadata } from 'next';
import { fetchCheckoutPageData } from '~/server/sanity/sanity.utils';
import CheckoutForm from '../_components/checkoutForm/CheckoutForm';
import CheckoutSummary from '../_components/checkoutSummary/CheckoutSummary';
import classes from './page.module.scss';

export const metadata: Metadata = {
  title: 'Dinepal - Checkout',
};

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
            <Text>
              Du tilldelas ett <strong>ordernummer</strong> när din beställning
              är klar. Uppge detta vid upphämtning.
            </Text>
            <CheckoutSummary />
          </Box>
          <CheckoutForm />
        </Box>
      </Container>
    </Box>
  );
}
