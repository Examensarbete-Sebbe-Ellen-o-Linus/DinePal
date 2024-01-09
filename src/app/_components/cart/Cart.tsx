'use client';
import { Badge, Box, Drawer, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useCart } from 'context/cartContext';
import {} from 'signals/cartSignals';
import CartCard from '../cartCard/CartCard';
import CheckoutTag from '../checkoutTag/CheckoutTag';
import classes from './Cart.module.scss';

export default function Cart() {
  const [opened, { toggle }] = useDisclosure();
  const { cartLenght, cartPrice } = useCart();

  //re render when cart changes

  return (
    <>
      <Box>
        <Box onClick={toggle} className={classes.container}>
          <Box className={classes.content}>
            <Badge className={classes.badge}>{cartLenght}</Badge>

            <Text className={classes.noWrapContainer}>Till varukorg</Text>
          </Box>
          <Box className={classes.noWrapContainer}>{cartPrice} :-</Box>
        </Box>
        <Drawer
          opened={opened}
          onClose={toggle}
          padding='xl'
          withCloseButton={true}
          size='xs'
          position='right'
          title={<Text>Din beställning</Text>}
          // title={<Title order={5}>Din beställning</Title>}
        >
          <Box className={classes.container2}>
            <CheckoutTag />
            <CartCard />
          </Box>
        </Drawer>
      </Box>
      ;
    </>
  );
}
