import type { Metadata, ResolvingMetadata } from 'next';
import { fetchBookingPageData } from '../../server/sanity/sanity.utils';
import BookingContent from '../_components/bookingContent/BookingContent';

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const bookingPageData = await fetchBookingPageData();
    return {
      title: 'Dinepal - ' + bookingPageData.seo.metaTitle,
      description: bookingPageData.seo.metaDescription,
    };
  } catch (error) {
    console.log(error);
    return {
      title: 'Dinepal',
    };
  }
}

export default async function Booking() {
  const data = await fetchBookingPageData();

  return <BookingContent bookingData={data} />;
}
