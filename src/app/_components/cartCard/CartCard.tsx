import { Box, Divider, Text, Title } from '@mantine/core';

import { useCart } from 'context/cartContext';
import { type CartItem } from 'context/initializers';
import Quantity from '../quantityButton/QuantityButton';
import { RemoveFromCartButton } from '../removeFromCart/removeFromCart';
import classes from './CartCard.module.scss';

interface ICartCard {
  item: CartItem;
}

export default function CartCard({ item }: ICartCard) {
  const { updateItemQuantity } = useCart();
  return (
    <Box className={classes.container}>
      <img src={item.dish.image.url} alt={item.dish.image.alt} />
      <Title order={6}>{item.dish.title}</Title>
      <Text>{item.dish.price} :-</Text>
      <Divider mt={0} mb={0} w={'100%'} my='md' />
      <Box className={classes.selectRemove}>
        <Quantity
          quantity={item.quantity}
          setQuantity={newQuantity =>
            updateItemQuantity(item.dish, newQuantity)
          }
        />
        <Box>
          <RemoveFromCartButton dish={item.dish} />
        </Box>
      </Box>
    </Box>
  );
}
