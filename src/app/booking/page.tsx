import { Box, Container, Text, Title } from '@mantine/core';

import { fetchBookingPageData } from '../../server/sanity/sanity.utils';
import BookingForm from '../_components/bookingForm/BookingForm';
import classes from './page.module.scss';

import booking from '../../../public/images/booking.jpg';

export default async function Booking() {
  const bookingData = await fetchBookingPageData();
  return (
    <Box>
      <Box className={classes.heroContainer}>
        <img
          src={booking.src}
          alt='Picture of bowl with yoghurt, granola and berries together with a plate with a cake on it.'
        />
        <Box className={classes.titleContainer}></Box>
      </Box>
      <Container className={classes.pageContent}>
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
      </Container>
    </Box>
  );
}
