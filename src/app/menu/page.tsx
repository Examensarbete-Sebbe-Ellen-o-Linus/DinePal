'use client';
import { Box, Container, MultiSelect, Text, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { fetchDishes } from '~/server/sanity/sanity.utils';
import DishCard from '../_components/dishCard/DishCard';
import Promo from '../_components/promo/Promo';
import { tagDetails, type IconKey } from '../_components/tags/Tags';
import { type IDish } from '../interfaces';
import scss from './page.module.scss';

export default function Menu() {
  const [dishes, setDishes] = useState<IDish[]>([]);
  const [error, setError] = useState(false);
  const [filteredDishes, setFilteredDishes] = useState<IDish[]>([]);
  const [selectedTags, setSelectedTags] = useState<IconKey[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchDishesData = async () => {
      try {
        const dishes = await fetchDishes();
        setDishes(dishes || []);
        setFilteredDishes(dishes || []);
      } catch (err) {
        setError(true);
        console.error('failed to fetch dishes', err);
      }
    };
    void fetchDishesData();
  }, []);

  useEffect(() => {
    if (selectedTags.length === 0) {
      setFilteredDishes(dishes);
    } else {
      const filtered = dishes.filter(dish =>
        selectedTags.every(tag => dish.tags?.includes(tag))
      );
      setFilteredDishes(filtered);
    }
  }, [selectedTags, dishes]);

  const handleTagChange = (value: string[]) => {
    const tags = value.filter((tag): tag is IconKey => tag in tagDetails);
    setSelectedTags(tags);
  };

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
              classNames={scss}
              label='Filtrera'
              placeholder='Filter'
              data={tagOptions}
              value={selectedTags}
              checkIconPosition='right'
              onChange={handleTagChange}
              comboboxProps={{
                position: 'bottom',
                middlewares: { flip: false, shift: false },
                offset: 0,
              }}
            />
          </Box>
          {!error ? (
            filteredDishes.length ? (
              filteredDishes.map((dish, i) => (
                <DishCard key={i} showDescription={true} dish={dish} />
              ))
            ) : (
              <Text className={scss.error}>
                Det finns tyvärr inga rätter med valda filter. Testa något annat
                filter eller kontakta restaurangen vid eventuella frågor.
              </Text>
            )
          ) : (
            <Text className={scss.error}>
              För tillfället går det inte att hämta menyn. Kontakta oss eller
              försök igen senare.
            </Text>
          )}
        </Box>
      </Container>
      <Promo />
    </>
  );
}
