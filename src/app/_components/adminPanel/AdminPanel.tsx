'use client';

import { Box } from '@mantine/core';
import { useState } from 'react';
import Bookings from '../bookings/Bookings';
import Orders from '../orders/Orders';
import ShortButton from '../shortButton/ShortButton';

type RenderSection = 'orders' | 'bookings';

export default function AdminPanel() {
  const [render, setRender] = useState<RenderSection>('orders');
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
