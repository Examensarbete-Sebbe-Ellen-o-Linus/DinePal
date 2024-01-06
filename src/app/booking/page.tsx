import { fetchBookingPageData } from '../../server/sanity/sanity.utils';
import BookingForm from '../_components/bookingForm/BookingForm';

export default async function Booking() {
  const bookingData = await fetchBookingPageData();
  return (
    <>
      <h1>Table booking</h1>
      <BookingForm />
    </>
  );
}
