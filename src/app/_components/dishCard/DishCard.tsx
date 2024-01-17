import { Box, Divider, Text, Title } from '@mantine/core';
import { useCart } from 'context/cartContext';
import Link from 'next/link';
import type { IDish } from '~/app/interfaces';
import AddButton from '../addButton/AddButton';
import CustomImage from '../customImage/CustomImage';
import PlaceholderSmall from '../placeholderSmall/PlaceholderSmall';
import Tags from '../tags/Tags';
import classes from './DishCard.module.scss';

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
        {dish.image.url ? (
          <CustomImage image={dish.image} className={classes.image} />
        ) : (
          <PlaceholderSmall />
        )}
      </Link>
      <Box className={classes.top}>
        <Box className={classes.textTop}>
          <Box className={classes.headingPrice}>
            <Link href={dishLink}>
              <Title order={6}>{dish.title}</Title>
            </Link>
            <Text>{dish.price} :-</Text>
          </Box>
          {showDescription && <Text>{dish.description}</Text>}
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
