'use client';

import { Box, Container, Divider, Tabs, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { theme } from '~/app/_theme/theme';
import { api } from '~/trpc/react';
import OrderCard from '../orderCard/OrderCard';
import classes from './order.module.scss';

export default function Orders() {
  const { data: fetchedOrders } = api.order.getTodaysOrders.useQuery();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints?.xs})`);
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
                {fetchedOrders &&
                  fetchedOrders
                    .filter(
                      fetchedOrders => fetchedOrders.orderStatus === 'received'
                    )
                    .sort(
                      (a, b) =>
                        new Date(a.createdAt).getTime() -
                        new Date(b.createdAt).getTime()
                    )
                    .map(order => <OrderCard key={order.id} order={order} />)}
              </Box>
            </Tabs.Panel>

            <Tabs.Panel value='ongoing'>
              <Box className={classes.topic}>
                <Title order={4}>Pågående</Title>
                {fetchedOrders &&
                  fetchedOrders
                    .filter(
                      fetchedOrders => fetchedOrders.orderStatus === 'ongoing'
                    )
                    .sort(
                      (a, b) =>
                        new Date(a.createdAt).getTime() -
                        new Date(b.createdAt).getTime()
                    )
                    .map(order => <OrderCard key={order.id} order={order} />)}
              </Box>
            </Tabs.Panel>

            <Tabs.Panel value='completed'>
              <Box className={classes.topic}>
                <Title order={4}>Färdigställda</Title>
                {fetchedOrders &&
                  fetchedOrders
                    .filter(
                      fetchedOrders => fetchedOrders.orderStatus === 'completed'
                    )
                    .sort(
                      (a, b) =>
                        new Date(a.createdAt).getTime() -
                        new Date(b.createdAt).getTime()
                    )
                    .map(order => <OrderCard key={order.id} order={order} />)}
              </Box>
            </Tabs.Panel>
          </Tabs>
        </Box>
      ) : (
        <Box className={classes.topicsContainer}>
          <Box className={classes.topic}>
            <Title order={4}>Mottagna</Title>
            <Divider className={classes.divider} />
            {fetchedOrders &&
              fetchedOrders
                .filter(
                  fetchedOrders => fetchedOrders.orderStatus === 'received'
                )
                .sort(
                  (a, b) =>
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime()
                )
                .map(order => <OrderCard key={order.id} order={order} />)}
          </Box>

          <Box className={classes.topic}>
            <Title order={4}>Pågående</Title>
            <Divider className={classes.divider} />
            {fetchedOrders &&
              fetchedOrders
                .filter(
                  fetchedOrders => fetchedOrders.orderStatus === 'ongoing'
                )
                .sort(
                  (a, b) =>
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime()
                )
                .map(order => <OrderCard key={order.id} order={order} />)}
          </Box>

          <Box className={classes.topic}>
            <Title order={4}>Färdigställda</Title>
            <Divider className={classes.divider} />
            {fetchedOrders &&
              fetchedOrders
                .filter(
                  fetchedOrders => fetchedOrders.orderStatus === 'completed'
                )
                .sort(
                  (a, b) =>
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime()
                )
                .map(order => <OrderCard key={order.id} order={order} />)}
          </Box>
        </Box>
      )}

      {/* <div>
        <p>
          {!session && (
            <span>You Need to login to view the content of this page.</span>
          )}
        </p>
        <p>{session && <span>Logged in as {session.user?.name}</span>}</p>
        <Button>
          <Link href={session ? '/api/auth/signout' : '/api/auth/signin'}>
            {session ? 'Sign out' : 'Sign in'}
          </Link>
        </Button>
      </div> */}
    </Container>
  );
}
