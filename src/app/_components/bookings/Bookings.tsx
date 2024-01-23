/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Box, Button, Divider, Text } from '@mantine/core';
import { DatePicker, type DatePickerProps } from '@mantine/dates';
import '@mantine/dates/styles.css';
import { useMediaQuery } from '@mantine/hooks';
import type { TableBooking } from '@prisma/client';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { theme } from '~/app/_theme/theme';
import { api } from '~/trpc/react';
import classes from './Bookings.module.scss';

export default function Bookings() {
  const { data: bookings } = api.booking.getTableBookings.useQuery();
  const bookedDates = bookings?.map(booking => dayjs(booking.date));
  const isDesktop = useMediaQuery(`(min-width: 36em`);
  const [choosenDate, setChoosenDate] = useState<Date | null>(new Date());
  const [filteredBookings, setFilteredBookings] = useState<TableBooking[]>([]);
  console.log('bokningar:', bookings);

  const getDayProps: DatePickerProps['getDayProps'] = date => {
    const specialDates = ['2024-01-10', '2024-01-8', '2024-01-6'];
    const styles: any = {};
    if (choosenDate && dayjs(date).isSame(choosenDate, 'day')) {
      styles.backgroundColor = theme.colors?.black?.[3] ?? '#221F1F';
    }

    if (
      bookedDates?.some(bookedDates => dayjs(date).isSame(bookedDates, 'day'))
    ) {
      styles.backgroundColor = theme.colors?.red?.[6] ?? '#FA5252';
      styles.color = theme.colors?.white?.[1] ?? '#ffffff';
      styles.borderRadius = '50%';
    }

    if (Object.keys(styles).length > 0) {
      return { style: styles };
    }
    return {};
  };

  useEffect(() => {
    if (bookings && choosenDate) {
      const bookingsOfChoosenDay = bookings.filter(booking =>
        dayjs(booking.date).isSame(choosenDate, 'day')
      );
      setFilteredBookings(bookingsOfChoosenDay);
      console.log('filteredBookings:', filteredBookings);
    }
  }, [choosenDate, bookings]);
  return (
    <>
      <h1>Bookings</h1>
      <Box className={classes.container}>
        <Box>
          <DatePicker
            size={isDesktop ? 'xl' : 'sm'}
            // minDate={minSelectableDate}
            // maxDate={maxSelectableDate}
            locale='sv'
            getDayProps={getDayProps}
            value={choosenDate}
            onChange={date => {
              setChoosenDate(date);
            }}
          />
        </Box>
        <Box>
          <h2>Bokningar för vald dag:</h2>

          {filteredBookings.length > 0 ? (
            filteredBookings.map(b => (
              <Box key={b.id}>
                <Text>{b.date.toDateString()}</Text>
                <Text>{b.email}</Text>
                <Text>Status: {b.bookingStatus}</Text>
                <Button>Ändra status på bokning</Button>
                <Divider />
              </Box>
            ))
          ) : (
            <Text>Inga Bokningar denna dag</Text>
          )}
        </Box>
      </Box>
    </>
  );
}
