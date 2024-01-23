import { Box, Container, Text, Title } from '@mantine/core';
import type { IAbout } from '~/app/interfaces';
import CustomCropImage from '../customCropImage/CustomCropImage';
import scss from './About.module.scss';

export default async function About({ about }: { about: IAbout }) {
  return (
    <section className={scss.container} id='about'>
      <Container size={1120} fluid>
        {about.image.url ? <CustomCropImage image={about.image} /> : <></>}
        <Box className={scss.text}>
          <Title order={3}>{about.title}</Title>
          <Text>{about.descriptionFirstP && about.descriptionFirstP}</Text>
          <Text>{about.descriptionSecondP && about.descriptionSecondP}</Text>
        </Box>
      </Container>
    </section>
  );
}
