'use client';
import { Box, NumberInput, Select, TextInput, Textarea } from '@mantine/core';
import { DatePicker, type DatePickerProps } from '@mantine/dates';
import '@mantine/dates/styles.css';
import { useMediaQuery } from '@mantine/hooks';
import dayjs from 'dayjs';
import 'dayjs/locale/sv';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';

import { theme } from '~/app/theme/theme';
import { bookingFormValidation } from '~/app/validation/bookingFormValidation';
import LongButton from '../longButton/LongButton';
import classes from './BookingForm.module.scss';
import BookingModal from './components/BookingModal';

export interface FormikValues {
  guests: string;
  date: Date | null;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  commentary: string;
}

export default function BookingForm() {
  // Don't know why the theme is not applied here. Using the value for xs here instead.
  const isDesktop = useMediaQuery(`(min-width: 36em`);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectKey, setSelectKey] = useState('');
  const [timeOptions, setTimeOptions] = useState<string[]>([]);

  // Supplies the user with available booking times. It will differ depending on which time and day the booking is made on
  // This is now hardcoded. Come back and make the time for booking dynamic.
  const getTimeOptions = (date: Date) => {
    const currentDateTime = new Date();
    const isToday = currentDateTime.toDateString() === date.toDateString();
    const currentHour = currentDateTime.getHours();

    const dayOfWeek = date.getDay();
    const startHour = 10;
    let endHour;

    if ([1, 2, 3, 4].includes(dayOfWeek)) {
      // Monday to Thursday
      endHour = 15;
    } else if (dayOfWeek === 5) {
      // Friday
      endHour = 21;
    } else {
      // Saturday and Sunday
      endHour = 16;
    }

    const timeSlots = [];
    for (let hour = startHour; hour <= endHour; hour++) {
      const timeSlot = `${hour}:00`;
      // If the date is today, only add time slots that are in the future not that have passed
      if (!isToday || (isToday && hour > currentHour)) {
        timeSlots.push(timeSlot);
      }
    }

    return timeSlots;
  };

  const minSelectableDate = dayjs().toDate();

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const threeMonthBookingView = new Date(year, month + 3, 1);

  const maxSelectableDate = new Date(threeMonthBookingView);
  maxSelectableDate.setDate(maxSelectableDate.getDate() - 1);

  // This is just to be able to change the color of the selected day in the calendar
  const getDayProps: DatePickerProps['getDayProps'] = date => {
    const selectedDate = formik.values.date;
    if (selectedDate && dayjs(date).isSame(selectedDate, 'day')) {
      return {
        style: {
          // The theme is acting strange. I've to set up an alternate color to prevent
          backgroundColor: theme.colors?.black?.[3] ?? '#221F1F',
        },
      };
    }
    return {};
  };

  const formik = useFormik({
    initialValues: {
      guests: '',
      date: null,
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
      setModalOpen(true);
      console.log('Form submitted with values:', values);
    },
    validateOnChange: true,
    validateOnBlur: true,
  });

  function resetForm() {
    formik.resetForm();
    setSelectKey(prevKey => prevKey + 1);
  }
  function handleSubmitForm() {
    console.log('Final form values for submission:', formik.values);
    setModalOpen(false);
  }

  useEffect(() => {
    if (formik.values.date) {
      const newTimeOptions = getTimeOptions(formik.values.date);
      setTimeOptions(newTimeOptions);
    }
  }, [formik.values.date]);

  return (
    <Box className={classes.container}>
      {/* GUESTS */}
      <NumberInput
        withAsterisk={true}
        label='Antal gäster'
        name='guests'
        size='xs'
        min={1}
        allowDecimal={false}
        leftSectionWidth={'50px'}
        value={formik.values.guests}
        onChange={value => formik.setFieldValue('guests', value)}
        onBlur={formik.handleBlur}
        error={formik.touched.guests && formik.errors.guests ? null : undefined}
        styles={{
          input: {
            width: '128px',
          },
          label: {
            fontSize: theme.other?.body2,
          },
        }}
      />
      {/* Manually render the error message below the input to prevent styling errors */}
      {formik.touched.guests && formik.errors.guests && (
        <Box
          style={{
            color: theme.colors?.red?.[6] ?? '#FA5252',
            marginTop: '-16px',
            fontSize: '12px',
          }}
        >
          {formik.errors.guests}
        </Box>
      )}

      {/* CALENDAR */}
      <Box className={classes.datePickerWrapper}>
        <DatePicker
          size={isDesktop ? 'xl' : 'sm'}
          minDate={minSelectableDate}
          maxDate={maxSelectableDate}
          locale='sv'
          getDayProps={getDayProps}
          value={formik.values.date}
          onChange={date => {
            const guestsNumber = +formik.values.guests;
            if (guestsNumber >= 1 && guestsNumber <= 8) {
              void formik.setFieldValue('date', date);
            }
          }}
        />
        {(!formik.values.guests ||
          +formik.values.guests < 1 ||
          +formik.values.guests > 8) && (
          <Box className={classes.datePickerOverlay} />
        )}
      </Box>

      {/* TIME */}
      <Select
        label='Välj tid'
        name='time'
        withAsterisk={true}
        value={formik.values.time}
        onChange={time => formik.setFieldValue('time', time)}
        onBlur={formik.handleBlur}
        data={timeOptions}
        disabled={!formik.values.date}
        key={selectKey}
        error={
          formik.touched.time && formik.errors.time ? formik.errors.time : null
        }
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
        <form>
          <TextInput
            withAsterisk={true}
            label='Förnamn'
            name='firstName'
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && formik.errors.firstName}
            disabled={!formik.values.time}
          />

          <TextInput
            withAsterisk={true}
            label='Efternamn'
            name='lastName'
            value={formik.values.lastName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.lastName && formik.errors.lastName}
            disabled={!formik.values.time}
          />

          <TextInput
            withAsterisk={true}
            label='Email'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
            disabled={!formik.values.time}
          />

          <TextInput
            withAsterisk={true}
            label='Telefon'
            name='phone'
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && formik.errors.phone}
            disabled={!formik.values.time}
          />

          <Textarea
            label='Kommentar'
            name='commentary'
            value={formik.values.commentary}
            onChange={formik.handleChange}
            placeholder='Skriv kommentar...'
            disabled={!formik.values.time}
          />
          <Box onClick={() => setModalOpen(true)} mt='md'>
            <LongButton text={'Boka bord'} color={'black'} />
          </Box>
        </form>
      </Box>

      <BookingModal
        formikValues={formik.values}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleSubmitForm}
        onReset={resetForm}
      />
    </Box>
  );
}
