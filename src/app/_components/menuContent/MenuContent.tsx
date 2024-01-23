'use client';
import { Box, Container, MultiSelect, Text, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { type IDish, type IMenuPage } from '~/app/interfaces';
import MenuDishCard from '../menuDishCard/MenuDishCard';
import { tagDetails, type IconKey } from '../tags/Tags';
import scss from './menuContent.module.scss';

interface Props {
  dishes: IDish[];
  menu: IMenuPage;
}

export default function MenuContent({ dishes, menu }: Props) {
  const [filteredDishes, setFilteredDishes] = useState<IDish[]>([]);
  const [selectedTags, setSelectedTags] = useState<IconKey[]>([]);
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
              <Title order={2}>{menu?.title}</Title>
              <Box>
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
          {dishes ? (
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
    </>
  );
}
