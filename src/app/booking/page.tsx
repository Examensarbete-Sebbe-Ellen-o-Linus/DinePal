import type { Metadata } from 'next';
import { fetchBookingPageData } from '../../server/sanity/sanity.utils';
import BookingContent from '../_components/bookingContent/BookingContent';

export const metadata: Metadata = {
  title: 'Dinepal - Booking',
};

export default async function Booking() {
  const data = await fetchBookingPageData();

  return <BookingContent bookingData={data} />;
}
