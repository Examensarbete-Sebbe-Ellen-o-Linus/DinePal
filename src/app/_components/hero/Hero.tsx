/* eslint-disable @typescript-eslint/prefer-optional-chain */

import { Container, Title } from '@mantine/core';
import { IHero } from '../../interfaces';
import classes from './Hero.module.css';

export default async function Hero({ hero }: { hero: IHero }) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

  return (
    <Container className={classes.hero}>
      <Title order={1} className={classes.title}>
        {hero.title}
      </Title>
      {hero.description && <p>{hero.description}</p>}
      {hero.image && <img src={hero.image.url} alt={hero.image.alt}></img>}
      {hero.buttons &&
        hero.buttons.map((button, i) => <button key={i}>{button.text}</button>)}
    </Container>
  );
}
