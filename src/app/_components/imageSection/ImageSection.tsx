import { Box, Container, Title } from '@mantine/core';
import Link from 'next/link';
import type { IImageSection } from '~/app/interfaces';
import scss from './ImageSection.module.scss';

export default function ImageSection({
  imageSection,
}: {
  imageSection: IImageSection;
}) {
  return (
    <div className={scss.container}>
      <Container className={scss.innerContainer} maw={1120} fluid>
        {imageSection.imageCards?.map((image, i) => (
          <Box className={scss.imageCard} key={i}>
            {image.link && (
              <Link href={image.link?.pageType}>
                <>
                  <Box className={scss.overlay} />
                  <img src={image.url} alt={image.alt} />
                  <Title order={4}>{image.link.text}</Title>
                </>
              </Link>
            )}
          </Box>
        ))}
      </Container>
    </div>
  );
}
