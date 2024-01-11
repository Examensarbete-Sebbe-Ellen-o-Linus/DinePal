'use client';
import { Box, Container, MultiSelect, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { fetchDishes } from '~/server/sanity/sanity.utils';
import DishCard from '../_components/dishCard/DishCard';
import {
  GlutenFreeIcon,
  LactoseFreeIcon,
  SpicyIcon,
  VeganIcon,
  VegitarianIcon,
} from '../_components/tags/TagIcons';
import { IDish } from '../interfaces';
import scss from './page.module.scss';

export type IconKey =
  | 'spicy'
  | 'vegan'
  | 'vegitarian'
  | 'glutenFree'
  | 'lactoseFree';

export const tagDetails = {
  vegan: { title: 'Vegan', Icon: VeganIcon },
  vegitarian: { title: 'Lakto-ovo vegetarian', Icon: VegitarianIcon },
  glutenFree: { title: 'Glutenfri', Icon: GlutenFreeIcon },
  lactoseFree: { title: 'Laktosfri', Icon: LactoseFreeIcon },
  spicy: { title: 'Stark', Icon: SpicyIcon },
};

export default function Menu() {
  const [dishes, setDishes] = useState<IDish[] | null>();
  const [error, setError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchDishesData = async () => {
      try {
        const dishes = await fetchDishes();
        setDishes(dishes);
      } catch (err) {
        setError(true);
        console.error('failed to fetch dishes', err);
      }
    };
    void fetchDishesData();
  }, []);

  const tagOptions = Object.entries(tagDetails).map(([key, detail]) => ({
    value: key,
    label: detail.title,
    Icon: detail.Icon,
  }));

  return (
    <>
      <Container size={1120} className={scss.container}>
        <Box className={scss.grid}>
          <Box className={scss.top}>
            <Title order={2}>Menu</Title>
            <MultiSelect
              className={scss.multiSelect}
              label='Filtrera'
              placeholder='Filter'
              data={tagOptions}
              checkIconPosition='right'
            />
          </Box>
          {dishes?.map((dish, i) => (
            <DishCard key={i} showDescription={true} dish={dish} />
          ))}
        </Box>
      </Container>
    </>
  );
}
