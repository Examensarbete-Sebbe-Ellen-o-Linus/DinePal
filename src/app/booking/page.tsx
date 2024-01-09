'use client';
import { Box, Text, Title } from '@mantine/core';

import { useEffect, useState } from 'react';
import { fetchBookingPageData } from '../../server/sanity/sanity.utils';
import BookingForm from '../_components/bookingForm/BookingForm';
import classes from './page.module.scss';

export default function Booking() {
  const [bookingData, setBookingData] = useState({ title: '', text: '' });

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchBookingPageData();
      setBookingData(data);
    };

    void loadData();
  }, []);
  return (
    <Box className={classes.container}>
      <Box className={classes.heroContainer}>
        <Box className={classes.titleContainer}>
          <Title order={2}>{bookingData.title}</Title>
        </Box>
        <Box className={classes.overlay} />
      </Box>
      <Box className={classes.pageContent}>
        <Box>
          <Title order={6}>
            Gör din bordsbokning digitalt och få en bekräftelse tillbaka på din
            utförda bokning.
          </Title>
          <Text>
            Här kan du boka bord för upp till 8 personer.
            <br />
            <br />
            {bookingData.text}
          </Text>
        </Box>
        <BookingForm />
      </Box>
    </Box>
  );
}
