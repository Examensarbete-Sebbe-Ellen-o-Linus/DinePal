import { Box, Container, Text, Title } from '@mantine/core';
import type { IAbout } from '~/app/interfaces';
import scss from './About.module.scss';

export default async function About({ about }: { about: IAbout }) {
  return (
    <section className={scss.container} id='about'>
      <Container>
        {about.image.url ? (
          <img src={about.image.url} alt={about.image.alt} />
        ) : (
          <></>
        )}
        <Box className={scss.text}>
          <Title order={3}>{about.title}</Title>
          <Text>{about.descriptionFirstP && about.descriptionFirstP}</Text>
          <Text>{about.descriptionSecondP && about.descriptionSecondP}</Text>
        </Box>
      </Container>
    </section>
  );
}
