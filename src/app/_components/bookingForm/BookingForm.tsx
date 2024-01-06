'use client';
import { Box, Group, NumberInput, TextInput, Textarea } from '@mantine/core';
import { DatePicker, TimeInput, type DatePickerProps } from '@mantine/dates';
import '@mantine/dates/styles.css';
import dayjs from 'dayjs';
import 'dayjs/locale/sv';
import { useFormik } from 'formik';
import { useState } from 'react';

import { theme } from '~/app/theme/theme';
import LongButton from '../longButton/LongButton';
import classes from './BookingForm.module.scss';

export default function BookingForm() {
  // DatePicker
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
  // DatePicker

  // Form
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      commentary: '',
    },
    onSubmit: values => {
      console.log(values);
      // handle form submission
    },
    // later add validationSchema or validate for validation
  });

  // Form

  return (
    <Box className={classes.container}>
      {/* GUESTS */}
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
            fontSize: theme.other?.body1,
            width: '128px',
          },
          label: {
            fontSize: theme.other?.body2,
          },
        }}
      />

      {/* CALENDAR */}
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

      {/* TIME */}
      <TimeInput
        label='Välj tid'
        placeholder='Input placeholder'
        withAsterisk={true}
        styles={{
          input: {
            fontSize: theme.other?.body1,
            width: '128px',
          },
          label: {
            fontSize: theme.other?.body2,
          },
        }}
      />

      {/* FORM */}
      <Box className={classes.formContainer}>
        <form onSubmit={formik.handleSubmit}>
          <TextInput
            label='Förnamn'
            name='firstName'
            value={formik.values.firstName}
            onChange={formik.handleChange}
            withAsterisk={true}
            styles={{
              input: {
                fontSize: theme.other?.body1,
                width: '100%',
              },
              label: {
                fontSize: theme.other?.body2,
              },
            }}
          />

          <TextInput
            label='Efternamn'
            name='lastName'
            value={formik.values.lastName}
            onChange={formik.handleChange}
            withAsterisk={true}
          />

          <TextInput
            label='Email'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            withAsterisk={true}
          />

          <TextInput
            label='Telefon'
            name='phone'
            value={formik.values.phone}
            onChange={formik.handleChange}
            withAsterisk={true}
          />

          <Textarea
            label='Kommentar'
            name='kommentar'
            value={formik.values.commentary}
            onChange={formik.handleChange}
            placeholder='Skriv kommentar...'
          />
          <Group mt='md'>
            <LongButton text={'Boka bord'} color={'black'} />
          </Group>
        </form>
      </Box>
    </Box>
  );
}
