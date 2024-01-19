'use client';
import { Box, Container, MultiSelect, Text, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { fetchDishes, fetchMenuPageData } from '~/server/sanity/sanity.utils';
import MenuDishCard from '../_components/menuDishCard/MenuDishCard';
import Promo from '../_components/promo/Promo';
import { tagDetails, type IconKey } from '../_components/tags/Tags';
import { type IDish, type IMenuPage } from '../interfaces';
import scss from './page.module.scss';

export default function Menu() {
  const [dishes, setDishes] = useState<IDish[]>([]);
  const [error, setError] = useState(false);
  const [filteredDishes, setFilteredDishes] = useState<IDish[]>([]);
  const [selectedTags, setSelectedTags] = useState<IconKey[]>([]);
  const [menuData, setmenuData] = useState<IMenuPage>();
  const [lastScrollUp, setLastScrollUp] = useState(0);
  const [filterVisible, setFilterVisible] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollUp = window.scrollY || document.documentElement.scrollTop;
      if (scrollUp > lastScrollUp) {
        setFilterVisible(false);
        setIsDropdownOpen(false);
      } else {
        setFilterVisible(true);
      }
      setLastScrollUp(scrollUp <= 0 ? 0 : scrollUp);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollUp]);

  useEffect(() => {
    const fetchMenuData = async () => {
      const menu = await fetchMenuPageData();
      setmenuData(menu);
    };
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
    void fetchMenuData();
  }, []);

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    } else {
      const hash = window.location.hash.slice(1);

      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
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
          <Box className={` ${!filterVisible ? scss.hideTop : scss.filterTop}`}>
            <Box>
              <Title order={2}>{menuData?.title}</Title>
              <Box className={scss.hej}>
                <MultiSelect
                  classNames={scss}
                  dropdownOpened={isDropdownOpen}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  onBlur={() => setIsDropdownOpen(false)}
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
            </Box>
          </Box>
          {!error ? (
            filteredDishes.length ? (
              filteredDishes.map((dish, i) => (
                <MenuDishCard key={i} dish={dish} />
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
