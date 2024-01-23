'use client';

import { Box, Container, Text, Title } from '@mantine/core';
import Link from 'next/link';
import type { IDish } from '../../interfaces';
import DishCard from '../dishCard/DishCard';
import ShortButton from '../shortButton/ShortButton';
import scss from './SelectedDishes.module.scss';

export default function SelectedDishes({ dishes }: { dishes: IDish[] }) {
  return (
    <Container
      style={{ border: '2px solid red' }}
      size={1120}
      className={scss.container}
    >
      <Box className={scss.grid}>
        <Title order={2}>Favoriter</Title>
        {dishes.map((dish, i) => (
          <DishCard key={i} showDescription={false} dish={dish} />
        ))}
        <Box className={scss.information}>
          <Text>
            Upptäck vår take away-service! Beställ din måltid online och hämta
            din mat hos oss. <br />
            Snabbt, smidigt och gott!
          </Text>
          <Link href='/menu'>
            <ShortButton text={'Meny'} color={'orange'} />
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
