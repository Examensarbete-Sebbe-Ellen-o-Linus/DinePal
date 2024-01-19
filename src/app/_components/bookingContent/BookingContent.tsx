'use client';

import { Box, Text, Title } from '@mantine/core';
import { IBookingPage } from '~/app/interfaces';
import BookingForm from '../bookingForm/BookingForm';
import classes from './bookingContent.module.scss';

export default function BookingContent({
  bookingData,
}: {
  bookingData: IBookingPage;
}) {
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
