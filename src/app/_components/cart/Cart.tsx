'use client';
import { Badge, Box, Drawer, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useCart } from 'context/cartContext';
import { formatPrice } from '~/app/formatPrice';
import CartCard from '../cartCard/CartCard';
import CheckoutTag from '../checkoutTag/CheckoutTag';
import classes from './Cart.module.scss';

export default function Cart() {
  const [opened, { toggle }] = useDisclosure();
  const { cartState, cartLenght, cartPrice } = useCart();

  return (
    <Box>
      <Box onClick={toggle} className={classes.container}>
        <Box className={classes.content}>
          <Badge className={classes.badge}>{cartLenght}</Badge>
          <Text className={classes.noWrapContainer}>Till varukorg</Text>
        </Box>
        <Box className={classes.noWrapContainer}>
          {' '}
          {formatPrice(cartPrice)} :-
        </Box>
      </Box>
      <Drawer
        opened={opened}
        onClose={toggle}
        padding='xl'
        withCloseButton={true}
        size='xs'
        position='right'
        title={<Text>Din beställning</Text>}
      >
        <Box className={classes.container2}>
          <CheckoutTag onClick={toggle} />
          {cartState.map((item, index) => (
            <CartCard key={index} item={item} />
          ))}
        </Box>
      </Drawer>
    </Box>
  );
}
