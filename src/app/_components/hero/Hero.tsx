import { Container, Title } from '@mantine/core';
import Link from 'next/link';
import { type IHero } from '../../interfaces';
import ShortButton from '../shortButton/ShortButton';
import classes from './Hero.module.scss';

export default async function Hero({ hero }: { hero: IHero }) {
  return (
    <Container className={classes.hero}>
      <Title order={1} className={classes.title}>
        {hero.title}
      </Title>
      {hero.description && <p>{hero.description}</p>}
      {hero.image && <img src={hero.image.url} alt={hero.image.alt}></img>}
      {hero.buttons &&
        hero.buttons.map((button, i) => <button key={i}>{button.text}</button>)}
      <Link href='/menu'>
        <ShortButton text={'Meny'} color={'orange'} />
      </Link>
      <Link href='/booking'>
        <ShortButton text={'Boka bord'} color={'black'} />
      </Link>
    </Container>
  );
}
