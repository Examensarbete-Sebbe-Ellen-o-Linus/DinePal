import { Container, Title } from '@mantine/core';
import type { Metadata, ResolvingMetadata } from 'next';
import { fetchGalleryPageData } from '../../server/sanity/sanity.utils';
import scss from './page.module.scss';

// export const metadata: Metadata = {
//   title: 'Dinepal - Galleri',
// };

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const galleryPageData = await fetchGalleryPageData();
    console.log('in the metadata', galleryPageData);
    return {
      title: 'Dinepal - ' + galleryPageData.seo.metaTitle,
      description: galleryPageData.seo.metaDescription,
    };
  } catch (error) {
    console.log(error);
    return {
      title: 'Dinepal',
    };
  }
}

// export default function Page({ params, searchParams }: Props) {}

export default async function GalleryPage() {
  const galleryPageData = await fetchGalleryPageData();
  console.log(' in the component', galleryPageData);

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
              <img src={image.url} alt={image.alt} className={scss.image} />
            </div>
          );
        })}
      </div>
    </Container>
  );
}
