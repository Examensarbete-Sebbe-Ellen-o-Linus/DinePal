import { Title } from '@mantine/core';
import {
  fetchDishes,
  fetchGalleryPageData,
} from '../../server/sanity/sanity.utils';
import DishCard from '../_components/dishCard/DishCard';

export default async function GalleryPage() {
  const galleryPageData = await fetchGalleryPageData();

  // Render loading state if data is not yet fetched
  if (!galleryPageData) {
    return <div>Loading...</div>;
  }
  const { galleryImgs, title } = galleryPageData;

  const dishes = await fetchDishes();

  return (
    <>
      <Title order={2}>Gallery</Title>
      <div>{title}</div>
      {dishes.map((dish, i) => (
        <DishCard key={i} showDescription={false} dish={dish} />
      ))}
      <div>
        {galleryImgs?.map((image, i) => (
          <img key={i} src={image.url} alt={image.alt} />
        ))}
      </div>
    </>
  );
}
