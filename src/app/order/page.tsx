'use client';
import { Box, Container, Tabs, Title } from '@mantine/core';

import { useMediaQuery } from '@mantine/hooks';
import OrderCard from '../_components/orderCard/OrderCard';
import { theme } from '../theme/theme';
import classes from './page.module.scss';

export default function Order() {
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints?.sm})`);
  const isTablet = useMediaQuery(`(max-width: ${theme.breakpoints?.md})`);
  return (
    <Container fluid className={classes.container}>
      {isMobile ? (
        <Title order={3}>Beställningar</Title>
      ) : (
        <Title mt={'48px'} order={2}>
          Beställningar
        </Title>
      )}

      {isTablet ? (
        <Box>
          <Tabs
            color={theme.colors?.orange ? theme.colors.orange[3] : '#FF5B00'}
            defaultValue='received'
          >
            <Tabs.List>
              <Tabs.Tab value='received'>Mottagna</Tabs.Tab>
              <Tabs.Tab value='ongoing'>Pågående</Tabs.Tab>
              <Tabs.Tab value='completed'>Färdigställda</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value='received'>
              <Box className={classes.topic}>
                <Title order={4}>Mottagna</Title>
                <OrderCard />
                <OrderCard />
                <OrderCard />
              </Box>
            </Tabs.Panel>

            <Tabs.Panel value='ongoing'>
              <Box className={classes.topic}>
                <Title order={4}>Pågående</Title>
                <OrderCard />
                <OrderCard />
                <OrderCard />
              </Box>
            </Tabs.Panel>

            <Tabs.Panel value='completed'>
              <Box className={classes.topic}>
                <Title order={4}>Färdigställda</Title>
                <OrderCard />
                <OrderCard />
                <OrderCard />
              </Box>
            </Tabs.Panel>
          </Tabs>
        </Box>
      ) : (
        <Box className={classes.topicsContainer}>
          <Box className={classes.topic}>
            <Title order={4}>Mottagna</Title>
            <OrderCard />
            <OrderCard />
            <OrderCard />
          </Box>

          <Box className={classes.topic}>
            <Title order={4}>Pågående</Title>
            <OrderCard />
            <OrderCard />
            <OrderCard />
          </Box>

          <Box className={classes.topic}>
            <Title order={4}>Färdigställda</Title>
            <OrderCard />
            <OrderCard />
            <OrderCard />
          </Box>
        </Box>
      )}
    </Container>
  );
}
