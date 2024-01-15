'use client';
import { Box, Container, Divider, Tabs, Title } from '@mantine/core';

import { useMediaQuery } from '@mantine/hooks';
import { useState } from 'react';
import OrderCard from '../_components/orderCard/OrderCard';
import { theme } from '../theme/theme';
import classes from './page.module.scss';

type StatusType = 'received' | 'ongoing' | 'completed';

interface OrderType {
  id: number;
  status: StatusType;
}

export default function Order() {
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints?.xs})`);
  const isTablet = useMediaQuery(`(max-width: ${theme.breakpoints?.md})`);

  const [orders, setOrders] = useState<OrderType[]>([
    { id: 1, status: 'received' },
    { id: 2, status: 'received' },
    { id: 3, status: 'received' },
  ]);

  function updateOrderStatus(orderId: number, newStatus: StatusType) {
    setOrders(
      orders.map(order => {
        if (order.id === orderId) {
          return { ...order, status: newStatus };
        }
        return order;
      })
    );
  }

  const renderOrderCards = (status: StatusType) =>
    orders
      .filter(order => order.status === status)
      .map(order => (
        <OrderCard
          key={order.id}
          id={order.id}
          status={order.status}
          updateStatus={newStatus => updateOrderStatus(order.id, newStatus)}
        />
      ));

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
                {renderOrderCards('received')}
              </Box>
            </Tabs.Panel>

            <Tabs.Panel value='ongoing'>
              <Box className={classes.topic}>
                <Title order={4}>Pågående</Title>
                {renderOrderCards('ongoing')}
              </Box>
            </Tabs.Panel>

            <Tabs.Panel value='completed'>
              <Box className={classes.topic}>
                <Title order={4}>Färdigställda</Title>
                {renderOrderCards('completed')}
              </Box>
            </Tabs.Panel>
          </Tabs>
        </Box>
      ) : (
        <Box className={classes.topicsContainer}>
          <Box className={classes.topic}>
            <Title order={4}>Mottagna</Title>
            <Divider className={classes.divider} />
            {renderOrderCards('received')}
          </Box>

          <Box className={classes.topic}>
            <Title order={4}>Pågående</Title>
            <Divider className={classes.divider} />
            {renderOrderCards('ongoing')}
          </Box>

          <Box className={classes.topic}>
            <Title order={4}>Färdigställda</Title>
            <Divider className={classes.divider} />
            {renderOrderCards('completed')}
          </Box>
        </Box>
      )}
    </Container>
  );
}
