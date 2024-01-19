'use client';

import { Box, Container, Divider, Tabs, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useState } from 'react';
import { theme } from '~/app/theme/theme';

import type { Orderstatus } from '@prisma/client';
import { api } from '~/trpc/react';
import OrderCard from '../orderCard/OrderCard';
import classes from './order.module.scss';

// type StatusType = 'received' | 'ongoing' | 'completed';

// interface OrderType {
//   id: string;
//   status: StatusType;
// }

export default function Orders() {
  const { data: fetchedOrders } = api.order.getOrders.useQuery();
  // const session = await getServerAuthSession();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints?.xs})`);
  const isTablet = useMediaQuery(`(max-width: ${theme.breakpoints?.md})`);

  const reviecedOrders = fetchedOrders?.filter(
    order => order.orderStatus === 'received'
  );
  console.log('reviecedOrders', reviecedOrders);

  console.log('orders', fetchedOrders);

  const [orders, setOrders] = useState(fetchedOrders || []);

  function updateOrderStatus(orderId: string, newStatus: Orderstatus) {
    setOrders(
      orders.map(order => {
        if (order.id === orderId) {
          return { ...order, status: newStatus };
        }
        return order;
      })
    );
  }

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
                    .filter(order => order.orderStatus === 'received')
                    .map(order => (
                      <OrderCard
                        key={order.id}
                        order={order}
                        updateStatus={newStatus =>
                          updateOrderStatus(order.id, newStatus)
                        }
                      />
                    ))}
              </Box>
            </Tabs.Panel>

            <Tabs.Panel value='ongoing'>
              <Box className={classes.topic}>
                <Title order={4}>Pågående</Title>
                {fetchedOrders &&
                  fetchedOrders
                    .filter(order => order.orderStatus === 'ongoing')
                    .map(order => (
                      <OrderCard
                        key={order.id}
                        order={order}
                        updateStatus={newStatus =>
                          updateOrderStatus(order.id, newStatus)
                        }
                      />
                    ))}
              </Box>
            </Tabs.Panel>

            <Tabs.Panel value='completed'>
              <Box className={classes.topic}>
                <Title order={4}>Färdigställda</Title>
                {fetchedOrders &&
                  fetchedOrders
                    .filter(order => order.orderStatus === 'completed')
                    .map(order => (
                      <OrderCard
                        key={order.id}
                        order={order}
                        updateStatus={newStatus =>
                          updateOrderStatus(order.id, newStatus)
                        }
                      />
                    ))}
              </Box>
            </Tabs.Panel>
          </Tabs>
        </Box>
      ) : (
        <Box className={classes.topicsContainer}>
          <Box className={classes.topic}>
            <Title order={4}>Mottagna</Title>
            <Divider className={classes.divider} />
            {orders
              .filter(order => order.orderStatus === 'received')
              .map(order => (
                <OrderCard
                  key={order.id}
                  order={order}
                  updateStatus={newStatus =>
                    updateOrderStatus(order.id, newStatus)
                  }
                />
              ))}
          </Box>

          <Box className={classes.topic}>
            <Title order={4}>Pågående</Title>
            <Divider className={classes.divider} />
            {orders
              .filter(order => order.orderStatus === 'ongoing')
              .map(order => (
                <OrderCard
                  key={order.id}
                  order={order}
                  updateStatus={newStatus =>
                    updateOrderStatus(order.id, newStatus)
                  }
                />
              ))}
          </Box>

          <Box className={classes.topic}>
            <Title order={4}>Färdigställda</Title>
            <Divider className={classes.divider} />
            {/* {renderOrderCards('completed')} */}
            {orders
              .filter(order => order.orderStatus === 'completed')
              .map(order => (
                <OrderCard
                  key={order.id}
                  order={order}
                  updateStatus={newStatus =>
                    updateOrderStatus(order.id, newStatus)
                  }
                />
              ))}
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
