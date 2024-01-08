import { Container } from '@mantine/core';
import { IAbout } from '~/app/interfaces';

export default async function About({ about }: { about: IAbout }) {
  return (
    <section className='container'>
      <Container>
        <h2>{about.title}</h2>
        {about.description && <p>{about.description}</p>}
      </Container>
    </section>
  );
}
