'use client';
import { Box, NumberInput, Select, TextInput, Textarea } from '@mantine/core';
import { DatePicker, type DatePickerProps } from '@mantine/dates';
import '@mantine/dates/styles.css';
import dayjs from 'dayjs';
import 'dayjs/locale/sv';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';

import { theme } from '~/app/theme/theme';
import { bookingFormValidation } from '~/app/validation/bookingFormValidation';
import LongButton from '../longButton/LongButton';
import classes from './BookingForm.module.scss';

export default function BookingForm() {
  // Time Select
  const [timeOptions, setTimeOptions] = useState<string[]>([]);

  //   const getTimeOptions = (date: Date) => {
  //     const dayOfWeek = date.getDay();
  //     if ([1, 2, 3, 4].includes(dayOfWeek)) {
  //       // Monday to Thursday, 10:00 to 15:00
  //       return Array.from({ length: 6 }, (_, i) => `${10 + i}:00`);
  //     } else if ([5, 6, 0].includes(dayOfWeek)) {
  //       // Friday to Sunday, 10:00 to 16:00
  //       return Array.from({ length: 7 }, (_, i) => `${10 + i}:00`);
  //     }
  //     return [];
  //   };

  const getTimeOptions = (date: Date) => {
    const currentDateTime = new Date();
    const isToday = currentDateTime.toDateString() === date.toDateString();
    const currentHour = currentDateTime.getHours();

    const dayOfWeek = date.getDay();
    const startHour = 10; // Booking starts at 10:00
    const endHour = [1, 2, 3, 4].includes(dayOfWeek) ? 15 : 16; // 15:00 for Mon-Thu, 16:00 for Fri-Sun

    const timeSlots = [];
    for (let hour = startHour; hour <= endHour; hour++) {
      const timeSlot = `${hour}:00`;
      // If the date is today, only add time slots that are in the future
      if (!isToday || (isToday && hour > currentHour)) {
        timeSlots.push(timeSlot);
      }
    }

    return timeSlots;
  };

  // Time Select

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
      guests: 1,
      date: new Date(),
      time: '',
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

  // Time Select

  useEffect(() => {
    if (formik.values.date) {
      const newTimeOptions = getTimeOptions(formik.values.date);
      setTimeOptions(newTimeOptions);
    }
  }, [formik.values.date]);
  // Time Select

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
        allowDecimal={true}
        leftSectionWidth={'50px'}
        value={formik.values.guests}
        onChange={value => formik.setFieldValue('guests', value)}
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
        // value={value}
        // onChange={setValue}
        size='xl'
        minDate={minSelectableDate}
        maxDate={maxSelectableDate}
        locale='sv'
        getDayProps={getDayProps}
        value={formik.values.date}
        onChange={date => formik.setFieldValue('date', date)}
      />

      {/* TIME */}
      <Select
        label='Välj tid'
        placeholder='Tider'
        withAsterisk={true}
        value={formik.values.time}
        onChange={time => formik.setFieldValue('time', time)}
        data={timeOptions}
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
