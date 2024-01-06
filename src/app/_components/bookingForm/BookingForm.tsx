'use client';
import { Box, NumberInput } from '@mantine/core';
import { DatePicker, TimeInput, type DatePickerProps } from '@mantine/dates';
import '@mantine/dates/styles.css';
import dayjs from 'dayjs';
import 'dayjs/locale/sv';
import { useState } from 'react';

import { theme } from '~/app/theme/theme';
import classes from './BookingForm.module.scss';

export default function BookingForm() {
  const [value, setValue] = useState<Date | null>(null);

  const minSelectableDate = dayjs().toDate();

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const threeMonthBookingView = new Date(year, month + 3, 1);

  const maxSelectableDate = new Date(threeMonthBookingView);
  maxSelectableDate.setDate(maxSelectableDate.getDate() - 1);

  const getDayProps: DatePickerProps['getDayProps'] = date => {
    if (value && date.getTime() === value.getTime()) {
      return {
        style: {
          // The theme is acting strange. I've to set up an alternate color to prevent undefined.
          backgroundColor: theme.colors?.black?.[3] ?? '#221F1F',
        },
      };
    }

    return {};
  };

  return (
    <Box className={classes.container}>
      <NumberInput
        withAsterisk={true}
        label='Antal gäster'
        placeholder='Välj antal'
        size='xs'
        min={1}
        max={8}
        allowDecimal={false}
        leftSectionWidth={'50px'}
        styles={{
          input: {
            fontSize: '18px',
            width: '128px',
          },
          label: {
            fontSize: '18px',
          },
        }}
      />

      <DatePicker
        allowDeselect
        value={value}
        onChange={setValue}
        size='xl'
        minDate={minSelectableDate}
        maxDate={maxSelectableDate}
        locale='sv'
        getDayProps={getDayProps}
      />

      <TimeInput
        label='Välj tid'
        placeholder='Input placeholder'
        withAsterisk={true}
        styles={{
          input: {
            fontSize: '18px',
            width: '128px',
          },
          label: {
            fontSize: '18px',
          },
        }}
      />
    </Box>
  );
}
