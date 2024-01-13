'use client';
import { Box, Title } from '@mantine/core';

import { useMediaQuery } from '@mantine/hooks';
import OrderCard from '../_components/orderCard/OrderCard';
import { theme } from '../theme/theme';
import classes from './page.module.scss';

export default function Order() {
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints?.xs})`);
  return (
    <Box className={classes.container}>
      {isMobile ? (
        <Title mt={'48px'} order={3}>
          Beställningar
        </Title>
      ) : (
        <Title mt={'48px'} order={2}>
          Beställningar
        </Title>
      )}
      <OrderCard />
    </Box>
  );
}
