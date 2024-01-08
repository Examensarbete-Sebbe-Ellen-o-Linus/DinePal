import { Title } from '@mantine/core';
import { fetchGalleryPageData } from '../../server/sanity/sanity.utils';

export default async function GalleryPage() {
  const galleryPageData = await fetchGalleryPageData();

  // Render loading state if data is not yet fetched
  if (!galleryPageData) {
    return <div>Loading...</div>;
  }
  const { galleryImgs, title } = galleryPageData;

  return (
    <>
      <Title order={2}>Gallery</Title>
      <div>{title}</div>
      <div>
        {galleryImgs?.map((image, i) => (
          <img key={i} src={image.url} alt={image.alt} />
        ))}
      </div>
    </>
  );
}
