'use client';
import { Box, NumberInput, TextInput, Textarea } from '@mantine/core';
import { DatePicker, TimeInput, type DatePickerProps } from '@mantine/dates';
import '@mantine/dates/styles.css';
import dayjs from 'dayjs';
import 'dayjs/locale/sv';
import { useFormik } from 'formik';
import { useState } from 'react';

import { theme } from '~/app/theme/theme';
import { bookingFormValidation } from '~/app/validation/bookingFormValidation';
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
    validationSchema: bookingFormValidation,
    onSubmit: values => {
      console.log(values);
    },
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
            withAsterisk={true}
            label='Förnamn'
            name='firstName'
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && formik.errors.firstName}
          />

          <TextInput
            withAsterisk={true}
            label='Efternamn'
            name='lastName'
            value={formik.values.lastName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.lastName && formik.errors.lastName}
          />

          <TextInput
            withAsterisk={true}
            label='Email'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
          />

          <TextInput
            withAsterisk={true}
            label='Telefon'
            name='phone'
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && formik.errors.phone}
          />

          <Textarea
            label='Kommentar'
            name='commentary'
            value={formik.values.commentary}
            onChange={formik.handleChange}
            placeholder='Skriv kommentar...'
          />
          <Box mt='md'>
            <LongButton text={'Boka bord'} color={'black'} type='submit' />
            {/* <Button type='submit'>Boka bord</Button> */}
          </Box>
        </form>
      </Box>
    </Box>
  );
}
