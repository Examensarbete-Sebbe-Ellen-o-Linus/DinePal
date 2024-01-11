import { Box, Divider, Text, Title } from '@mantine/core';

import { useCart } from 'context/cartContext';
import React from 'react';
import Quantity from '../quantityButton/QuantityButton';
import { RemoveFromCartButton } from '../removeFromCart/removeFromCart';
import classes from './CartCard.module.scss';

export default function CartCard() {
  const { cartState, updateItemQuantity } = useCart();

  return (
    <Box className={classes.container}>
      {cartState.map((item, i) => (
        <React.Fragment key={i}>
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
        </React.Fragment>
      ))}
    </Box>
  );
}
