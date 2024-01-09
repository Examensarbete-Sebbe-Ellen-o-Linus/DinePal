import { Box, Divider, Text, Title, Tooltip } from '@mantine/core';

import Link from 'next/link';
import type { IDish } from '~/app/interfaces';
import AddButton from '../addButton/AddButton';
import classes from './DishCard.module.css';
import {
  GlutenFreeIcon,
  LactoseFreeIcon,
  SpicyIcon,
  VeganIcon,
  VegitarianIcon,
} from './TagIcons';

interface Props {
  showDescription: boolean;
  dish: IDish;
}

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

export default function DishCard({ showDescription, dish }: Props) {
  const dishLink = `/product/${dish?.slug?.current ?? '404'}`;

  return (
    <Box className={classes.card}>
      <Link href={dishLink}>
        <img
          className={classes.image}
          src={dish.image.url}
          alt={dish.image.alt}
        />
      </Link>
      <Box className={classes.headingPrice}>
        <Link href={dishLink}>
          <Title order={6}>{dish.title}</Title>
        </Link>
        <Text>{dish.price} :-</Text>
      </Box>
      {showDescription && <Text>{dish.description}</Text>}
      <Box className={classes.iconContainer}>
        <Box className={classes.iconContainer}>
          {dish.tags.map((tagValue, i) => {
            const tagInfo = tagDetails[tagValue as IconKey];
            if (!tagInfo) return null;
            const { title, Icon } = tagInfo;
            return (
              <Tooltip label={title} key={i}>
                <Box>
                  <Icon />
                </Box>
              </Tooltip>
            );
          })}
        </Box>
      </Box>
      <Divider mt={0} mb={0} w={'100%'} my='md' />
      <AddButton showAddIcon={true} text={'Lägg till'} color={'black'} />
    </Box>
  );
}
