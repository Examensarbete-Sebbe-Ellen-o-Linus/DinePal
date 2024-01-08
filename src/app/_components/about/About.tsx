import { Container } from '@mantine/core';
import { IAbout } from '~/app/interfaces';
import scss from './About.module.scss';

export default async function About({ about }: { about: IAbout }) {
  return (
    <section className={scss.container}>
      <Container>
        {/* {about.image ?? <img src={about.image.url} alt={about.image.alt} />}
        <Title order={3}>{about.title}</Title>
        {about.description && <p>{about.description}</p>}
        {about.links?.map(link) => (
          <Link src={about.}></Link>
        )} */}
      </Container>
    </section>
  );
}
