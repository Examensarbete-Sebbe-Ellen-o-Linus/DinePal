import { Box, Divider, Text, Title } from '@mantine/core';

import type { IDish } from '~/app/interfaces';
import LongButton from '../longButton/LongButton';
import classes from './DishCard.module.css';
import {
  GlutenFreeIcon,
  LactoseFreeIcon,
  SpicyIcon,
  VeganIcon,
  VegitarianIcon,
} from './Icons';

interface Props {
  showDescription: boolean;
  dish: IDish;
}

type IconKey = 'spicy' | 'vegan' | 'vegitarian' | 'glutenFree' | 'lactoseFree';

const getTagIconComponent = (tag: string) => {
  const iconComponents: { [key in IconKey]: () => JSX.Element } = {
    spicy: SpicyIcon,
    vegan: VeganIcon,
    vegitarian: VegitarianIcon,
    glutenFree: GlutenFreeIcon,
    lactoseFree: LactoseFreeIcon,
  };

  return iconComponents[tag as IconKey] || null;
};

export default function DishCard({ showDescription, dish }: Props) {
  return (
    <Box className={classes.card}>
      <img
        className={classes.image}
        src={dish.image.url}
        alt={dish.image.alt}
      />

      <Box className={classes.headingPrice}>
        <Title order={6}>{dish.title}</Title>
        <Text>{dish.price} SEK</Text>
      </Box>

      {showDescription && <Text>{dish.description}</Text>}

      <Box className={classes.iconContainer}>
        <Box className={classes.iconContainer}>
          {dish.tags.map((tag, i) => {
            const TagIcon = getTagIconComponent(tag);
            return getTagIconComponent(tag) ? <TagIcon key={i} /> : null;
          })}
        </Box>
      </Box>
      <Divider mt={0} mb={0} w={'100%'} my='md' />
      <LongButton showAddIcon={true} text={'Lägg till'} color={'black'} />
    </Box>
  );
}
