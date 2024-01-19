import { fetchBookingPageData } from '../../server/sanity/sanity.utils';
import BookingContent from '../_components/bookingContent/BookingContent';

export default async function Booking() {
  const data = await fetchBookingPageData();

  return <BookingContent bookingData={data} />;
}
