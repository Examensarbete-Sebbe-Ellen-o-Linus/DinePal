'use client';

import { Box } from '@mantine/core';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { api } from '~/trpc/react';
import Bookings from '../bookings/Bookings';
import Orders from '../orders/Orders';
import ShortButton from '../shortButton/ShortButton';

type RenderSection = 'orders' | 'bookings';

const socket = io('https://socket-server-dinepal-237ee597ef2d.herokuapp.com');
export default function AdminPanel() {
  const [render, setRender] = useState<RenderSection>('orders');

  const { refetch: refetchBookings } = api.booking.getTableBookings.useQuery();

  useEffect(() => {
    const fetchNewBookings = async () => {
      await refetchBookings();
      console.log('useEffect triggered by socket!');
    };
    socket.on('bookingCreated', fetchNewBookings);

    return () => {
      socket.off('bookingCreated', fetchNewBookings);
    };
  });
  return (
    <>
      <Box
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          marginTop: '7rem',
          gap: '0.1rem',
        }}
      >
        <ShortButton
          text={'Ordrar'}
          color={'orange'}
          onClick={() => setRender('orders')}
        />
        <ShortButton
          text={'Bokningar'}
          color={'orange'}
          onClick={() => setRender('bookings')}
        />
      </Box>

      {render === 'orders' && <Orders />}
      {render === 'bookings' && <Bookings />}
    </>
  );
}
