import { Box, Title } from '@mantine/core';
import Link from 'next/link';
import { type IHero } from '../../interfaces';
import ShortButton from '../shortButton/ShortButton';
import classes from './Hero.module.scss';

export default async function Hero({ hero }: { hero: IHero }) {
  return (
    <Box className={classes.container}>
      {hero.description && <p>{hero.description}</p>}
      <Box className={classes.overlay} />
      {hero.image && (
        <img
          className={classes.heroImage}
          src={hero.image.url}
          alt={hero.image.alt}
        />
      )}
      <Box className={classes.content}>
        {hero.buttons &&
          hero.buttons.map((button, i) => (
            <button key={i}>{button.text}</button>
          ))}
        <Title order={1} className={classes.title}>
          {hero.title}
        </Title>
        <Box className={classes.buttonContainer}>
          <Link href='/menu'>
            <ShortButton text={'Meny'} color={'orange'} />
          </Link>
          <Link href='/booking'>
            <ShortButton text={'Boka bord'} color={'black'} />
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
