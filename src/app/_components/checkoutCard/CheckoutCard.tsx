'use client';
import { Box, Divider, Text } from '@mantine/core';

import { useCart } from 'context/cartContext';
import { type CartItem } from 'context/initializers';
import { formatPrice } from '~/app/formatPrice';
import Quantity from '../quantityButton/QuantityButton';
import { RemoveFromCartButton } from '../removeFromCart/removeFromCart';
import classes from './CheckoutCard.module.scss';

interface ICheckoutCard {
  item: CartItem;
}

export default function CheckoutCard({ item }: ICheckoutCard) {
  const { updateItemQuantity } = useCart();

  function calculateTotalPrice(quantity: number, price: number): string {
    const totalPrice = quantity * price;
    return formatPrice(totalPrice);
  }

  return (
    <Box className={classes.container}>
      <img
        className={classes.imgContainer}
        src={item.dish.image.url}
        alt={item.dish.image.alt}
      />
      <Box className={classes.contentContainer}>
        <Box className={classes.titlePrice}>
          <Text w={'100%'}>{item.dish.title}</Text>
          <Text style={{ whiteSpace: 'nowrap' }}>
            {calculateTotalPrice(item.quantity, item.dish.price)} :-
          </Text>
        </Box>
        <Divider mt={0} mb={0} w={'100%'} my='md' />
        <Box className={classes.selectRemove}>
          <Quantity
            quantity={item.quantity}
            setQuantity={newQuantity =>
              updateItemQuantity(item.dish, newQuantity)
            }
          />
          <RemoveFromCartButton dish={item.dish} />
        </Box>
      </Box>
    </Box>
  );
}
