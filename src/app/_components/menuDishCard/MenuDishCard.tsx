import { Box, Divider, Text, Title } from '@mantine/core';
import { useCart } from 'context/cartContext';
import type { IDish } from '~/app/interfaces';
import AddButton from '../addButton/AddButton';
import CustomCropImage from '../customCropImage/CustomCropImage';
import PlaceholderSmall from '../placeholderSmall/PlaceholderSmall';
import Tags from '../tags/Tags';
import classes from './MenuDishCard.module.scss';

export default function MenuDishCard({ dish }: { dish: IDish }) {
  const { handleAddToCart } = useCart();
  console.log('dish object:', dish);
  console.log('dish.image:', dish.image);

  return (
    <Box className={classes.card} id={dish.slug.current}>
      {dish.image?.url ? (
        <Box>
          <CustomCropImage image={dish.image} className={classes.image} />
        </Box>
      ) : (
        <PlaceholderSmall />
      )}

      <Box className={classes.top}>
        <Box className={classes.textTop}>
          <Box className={classes.headingPrice}>
            <Title order={6}>{dish.title}</Title>
            <Text>{dish.price}:-</Text>
          </Box>
          {dish.description && <Text>{dish.description}</Text>}
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
