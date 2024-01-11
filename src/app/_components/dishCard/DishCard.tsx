import { Box, Divider, Text, Title } from '@mantine/core';

import { useCart } from 'context/cartContext';
import Link from 'next/link';
import type { IDish } from '~/app/interfaces';
import AddButton from '../addButton/AddButton';
import Tags from '../tags/Tags';
import classes from './DishCard.module.css';

interface Props {
  showDescription: boolean;
  dish: IDish;
}

export default function DishCard({ showDescription, dish }: Props) {
  const dishLink = `/product/${dish?.slug?.current ?? '404'}`;
  const { handleAddToCart } = useCart();

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
        <Text>{dish.price}:-</Text>
      </Box>
      {showDescription && <Text>{dish.description}</Text>}
      <Box className={classes.iconContainer}>
        <Box className={classes.iconContainer}>
          <Tags dish={dish} />
        </Box>
      </Box>
      <Divider mt={0} mb={0} w={'100%'} my='md' />
      <AddButton
        showAddIcon={true}
        text={'Lägg till'}
        color={'black'}
        onClick={() => handleAddToCart(dish)}
      />
    </Box>
  );
}
