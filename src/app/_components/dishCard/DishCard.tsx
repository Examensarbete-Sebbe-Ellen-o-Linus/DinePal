'use client';

import { Box, Divider, Text, Title } from '@mantine/core';
import { useCart } from 'context/cartContext';
import Link from 'next/link';
import type { IDish } from '~/app/interfaces';
import AddButton from '../addButton/AddButton';
import CustomCropImage from '../customCropImage/CustomCropImage';
import PlaceholderSmall from '../placeholderSmall/PlaceholderSmall';
import Tags from '../tags/Tags';
import classes from './DishCard.module.scss';

interface Props {
  dish: IDish;
}

export default function DishCard({ dish }: Props) {
  const { handleAddToCart } = useCart();
  const menuLink = `/menu#${dish?.slug?.current ?? '/menu'}`;

  return (
    <Box className={classes.card} id={dish.slug.current}>
      <Link href={menuLink}>
        {dish.image?.url ? (
          <CustomCropImage image={dish.image} className={classes.image} />
        ) : (
          <PlaceholderSmall hover={true} />
        )}
      </Link>
      <Box className={classes.top}>
        <Box className={classes.textTop}>
          <Box className={classes.headingPrice}>
            <Link href={menuLink}>
              <Title order={6}>{dish.title}</Title>
            </Link>
            <Text>{dish.price}:-</Text>
          </Box>
        </Box>
        <Box className={classes.bottom}>
          <Box className={classes.iconContainer}>
            <Box className={classes.iconContainer}>
              <Tags dish={dish} />
            </Box>
          </Box>
          <Divider
            mt={0}
            mb={16}
            w={'100%'}
            my='md'
            className={classes.bottom}
          />
          <AddButton
            showAddIcon={true}
            text={'Lägg till'}
            color={'black'}
            onClick={() => handleAddToCart(dish)}
          />
        </Box>
      </Box>
    </Box>
  );
}
