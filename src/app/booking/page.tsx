import { Box, Text, Title } from '@mantine/core';

import { fetchBookingPageData } from '../../server/sanity/sanity.utils';
import BookingForm from '../_components/bookingForm/BookingForm';
import classes from './page.module.scss';

export default async function Booking() {
  const bookingData = await fetchBookingPageData();
  return (
    <Box className={classes.container}>
      <Box className={classes.heroContainer}>
        <Box className={classes.titleContainer}>
          <Title order={2}>Boka bord</Title>
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
            Vid bokningar för fler personer, vänligen maila oss på
            info@belliscafe.se.
            <br />
            <br />
            Vid frågor, maila oss på info@belliscafe.se alternativt ring oss på
            076-3223979.
          </Text>
        </Box>
        <BookingForm />
      </Box>
    </Box>
  );
}
