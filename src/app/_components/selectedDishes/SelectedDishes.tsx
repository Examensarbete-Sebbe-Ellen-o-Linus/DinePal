'use client';

import { Box, Container, Title } from '@mantine/core';
import Link from 'next/link';
import type { IDish } from '../../interfaces';
import DishCard from '../dishCard/DishCard';
import scss from './SelectedDishes.module.scss';

export default function SelectedDishes({ dishes }: { dishes: IDish[] }) {
  return (
    <Container size={1120} className={scss.container}>
      <Title order={2}>Favoriter</Title>
      {/* <Box className={scss.outerGrid}> */}
      <Box className={scss.grid}>
        {dishes.map((dish, i) => (
          <DishCard key={i} showDescription={false} dish={dish} />
        ))}
      </Box>
      {/* </Box> */}
      <div>
        <Box className={scss.bottom}>
          <Title order={5}>Ta del av hela vårt utbud</Title>
          <Link href='/menu'>Meny</Link>
        </Box>
      </div>
    </Container>
  );
}
