import { fetchBookingPageData } from '../../server/sanity/sanity.utils';

export default async function Booking() {
  const bookingData = await fetchBookingPageData();
  return (
    <>
      <h1>Table booking</h1>
    </>
  );
}
