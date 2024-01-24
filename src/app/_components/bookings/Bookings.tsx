/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Box, Button, Divider, Text, Title } from '@mantine/core';
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
  const [formattedChoosenDate, setFormattedChoosenDate] = useState<string>('');
  const [filteredBookings, setFilteredBookings] = useState<TableBooking[]>([]);

  const getDayProps: DatePickerProps['getDayProps'] = date => {
    const styles: any = {};

    if (
      bookedDates?.some(bookedDates => dayjs(date).isSame(bookedDates, 'day'))
    ) {
      styles.backgroundColor = theme.colors?.red?.[6] ?? '#FA5252';
      styles.color = theme.colors?.white?.[1] ?? '#ffffff';
      styles.borderRadius = '50%';
    }
    if (choosenDate && dayjs(date).isSame(choosenDate, 'day')) {
      styles.backgroundColor = theme.colors?.black?.[3] ?? '#221F1F';
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
      setFormattedChoosenDate(dayjs(choosenDate).format('DD MMM'));
      console.log('filteredBookings:', filteredBookings);
    }
  }, [choosenDate, bookings]);
  return (
    <Box className={classes.container}>
      <Title order={3}>Bokningar</Title>
      <Box>
        <Box
          style={{
            marginLeft: '1rem',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box
            style={{
              width: '2rem',
              height: '2rem',
              borderRadius: '50%',
              background: theme.colors?.red?.[6] ?? '#FA5252',
              marginRight: '0.5rem',
            }}
          />
          <Text style={{ fontSize: '4rem' }}>
            = Det finns bokningar denna dag
          </Text>
        </Box>
        <Box className={classes.boxContainer}>
          <Box style={{ display: 'flex', alignContent: 'center' }}>
            <DatePicker
              size={isDesktop ? 'xl' : 'md'}
              locale='sv'
              getDayProps={getDayProps}
              value={choosenDate}
              onChange={date => {
                setChoosenDate(date);
              }}
            />
          </Box>
          <Box className={classes.bookingsContainer}>
            <Title order={6}>Bokningar {formattedChoosenDate}</Title>
            <Divider style={{ margin: '0.4rem 0' }} />

            {filteredBookings.length > 0 ? (
              filteredBookings.map((b, index) => (
                <Box key={b.id}>
                  <Text>{b.date.toDateString()}</Text>
                  <Text>{b.email}</Text>
                  <Text>Status: {b.bookingStatus}</Text>
                  <Button>Ändra status på bokning</Button>
                  {index !== filteredBookings.length - 1 && (
                    <Divider style={{ marginTop: '0.5rem' }} />
                  )}
                </Box>
              ))
            ) : (
              <Text>Inga Bokningar denna dag</Text>
            )}
          </Box>
        </Box>
        <Box className={classes.tableSection}>
          <Title order={4}>Bord:</Title>
          <Box className={classes.tableRow}>
            <Text className={classes.tableText}>Bord 1: 4 platser</Text>
            <Text>Ledigt</Text>
          </Box>
          <Box className={classes.tableRow}>
            <Text className={classes.tableText}>Bord 2: 4 platser</Text>
            <Text>Ledigt</Text>
          </Box>
          <Box className={classes.tableRow}>
            <Text className={classes.tableText}>Bord 3: 6 platser</Text>
            <Text>Ledigt</Text>
          </Box>
          <Box className={classes.tableRow}>
            <Text className={classes.tableText}>Bord 4: 2 platser</Text>
            <Text>Ledigt</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
