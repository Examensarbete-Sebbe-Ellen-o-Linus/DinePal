import { Container, Title } from '@mantine/core';
import type { Metadata } from 'next';
import { fetchGalleryPageData } from '../../server/sanity/sanity.utils';
import CustomCropImage from '../_components/customCropImage/CustomCropImage';
import scss from './page.module.scss';

export const metadata: Metadata = {
  title: 'Dinepal - Galleri',
};

export default async function GalleryPage() {
  const galleryPageData = await fetchGalleryPageData();

  const gridPattern = [
    { col: 3, row: 1 },
    { col: 3, row: 1 },
    { col: 6, row: 1 },
    { col: 4, row: 2 },
    { col: 4, row: 1 },
    { col: 4, row: 2 },
    { col: 4, row: 1 },
  ];

  if (!galleryPageData) {
    return <div>Loading...</div>;
  }
  const { galleryImgs, title } = galleryPageData;

  return (
    <Container size={1120} className={scss.container}>
      <Title order={2}>{title}</Title>
      <div className={scss.grid}>
        {galleryImgs?.map((image, index) => {
          const pattern = gridPattern[index % gridPattern.length];
          if (!pattern) return null;
          const style = {
            gridColumn: `span ${pattern.col}`,
            gridRow: `span ${pattern.row}`,
          };
          return (
            <div key={index} className={scss.col} style={style}>
              {image.url && (
                <CustomCropImage image={image} className={scss.image} hotspot />
              )}
            </div>
          );
        })}
      </div>
    </Container>
  );
}
