import { fetchBookingPageData } from '../../server/sanity/sanity.utils';
import BookingForm from '../_components/bookingForm/BookingForm';
import DishCard from '../_components/dishCard/DishCard';

export default async function Booking() {
  const bookingData = await fetchBookingPageData();
  return (
    <>
      <h1>Table booking</h1>
      <BookingForm />
      <DishCard showDescription={false} />
    </>
  );
}
