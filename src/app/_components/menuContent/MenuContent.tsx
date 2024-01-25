'use client';
import { Box, Container, MultiSelect, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useRef, useState } from 'react';
import { theme } from '~/app/_theme/theme';
import { type IDish, type IMenuPage } from '~/app/interfaces';
import MenuDishCard from '../menuDishCard/MenuDishCard';
import { tagDetails, type IconKey } from '../tags/Tags';
import scss from './menuContent.module.scss';

interface Props {
  dishes: IDish[];
  menu: IMenuPage;
}

export default function MenuContent({ dishes, menu }: Props) {
  const [selectedTags, setSelectedTags] = useState<IconKey[]>([]);
  const [lastScrollUp, setLastScrollUp] = useState(0);
  const [filterVisible, setFilterVisible] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [categoryGroup, setCategoryGroup] = useState<ICategoryGroup>({});
  const menuSpacerRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints?.sm})`);
  type ICategoryGroup = Record<string, IDish[]>;

  useEffect(() => {
    const handleScroll = () => {
      const scrollUp = window.scrollY || document.documentElement.scrollTop;
      if (scrollUp > lastScrollUp) {
        setFilterVisible(false);
        setIsDropdownOpen(false);
        if (menuSpacerRef.current && isMobile) {
          menuSpacerRef.current.style.display = `grid`;
          menuSpacerRef.current.style.height = `144px`;
        } else if (menuSpacerRef.current && !isMobile) {
          menuSpacerRef.current.style.display = `none`;
        }
      } else {
        setFilterVisible(true);
      }
      setLastScrollUp(scrollUp <= 0 ? 0 : scrollUp);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollUp, isMobile]);

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

  const handleTagChange = (value: string[]) => {
    const tags = value.filter((tag): tag is IconKey => tag in tagDetails);
    setSelectedTags(tags);
  };

  const tagOptions = Object.entries(tagDetails).map(([key, detail]) => ({
    value: key,
    label: detail.title,
    Icon: detail.Icon,
  }));

  useEffect(() => {
    const filteredAndGroupedDishes = dishes
      .filter(
        dish =>
          selectedTags.length === 0 ||
          selectedTags.every(tag => dish.tags?.includes(tag))
      )
      .reduce<ICategoryGroup>((acc, dish: IDish) => {
        const category = dish.category ?? 'Övrigt';
        const categoryArray = acc[category] ?? [];
        categoryArray.push(dish);
        acc[category] = categoryArray;
        return acc;
      }, {});

    setCategoryGroup(filteredAndGroupedDishes);
  }, [dishes, selectedTags]);

  return (
    <>
      <Container maw={1120} className={scss.container}>
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
          <Box className={scss.menuSpacer} ref={menuSpacerRef} />
          {dishes ? (
            Object.keys(categoryGroup).length > 0 ? (
              Object.entries(categoryGroup).map(
                ([category, categoryDishes]) => (
                  <Box key={category} className={scss.categoryTitle}>
                    <Box className={scss.grid}>
                      <Title order={5} className={scss.categoryTitle}>
                        {category}
                      </Title>
                      {categoryDishes.map((dish, i) => (
                        <MenuDishCard key={i} dish={dish} />
                      ))}
                    </Box>
                  </Box>
                )
              )
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
