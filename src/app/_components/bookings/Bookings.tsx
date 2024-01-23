/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Box } from '@mantine/core';
import { DatePicker, type DatePickerProps } from '@mantine/dates';
import { useMediaQuery } from '@mantine/hooks';
import dayjs from 'dayjs';
import { useState } from 'react';
import { theme } from '~/app/_theme/theme';
import { api } from '~/trpc/react';
import classes from './Bookings.module.scss';

export default function Bookings() {
  const bookings = api.booking.getTableBookings.useQuery();
  const isDesktop = useMediaQuery(`(min-width: 36em`);
  const [choosenDate, setChoosenDate] = useState<Date | null>(new Date());
  console.log('bokningar:', bookings.data);

  const getDayProps: DatePickerProps['getDayProps'] = date => {
    const specialDates = ['2024-01-10', '2024-01-8', '2024-01-6'];
    const styles: any = {};
    if (choosenDate && dayjs(date).isSame(choosenDate, 'day')) {
      styles.backgroundColor = theme.colors?.black?.[3] ?? '#221F1F';
    }

    if (date.getDate() === 29 && date.getMonth() === 0) {
      styles.backgroundColor = theme.colors?.red?.[6] ?? '#FA5252';
      styles.color = theme.colors?.white?.[1] ?? '#ffffff';
      styles.borderRadius = '50%';
    }

    if (
      specialDates.some(specialDate => dayjs(date).isSame(specialDate, 'day'))
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
  return (
    <>
      <h1>Bookings</h1>
      <Box className={classes.container}>
        <Box className={classes.datePickerWrapper}>
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
          <Box className={classes.datePickerOverlay} />
        </Box>
      </Box>
    </>
  );
}
