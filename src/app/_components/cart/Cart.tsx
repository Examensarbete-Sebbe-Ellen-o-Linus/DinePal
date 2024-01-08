'use client';
import { Badge, Box, Drawer, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import {
  cartSignal,
  totalCartLenght,
  totalCartPrice,
} from 'signals/cartSignals';
import CartCard from '../cartCard/CartCard';
import CheckoutTag from '../checkoutTag/CheckoutTag';
import classes from './Cart.module.scss';

export default function Cart() {
  const [opened, { toggle }] = useDisclosure();
  const cart = cartSignal.value;
  return (
    <Box>
      {/* <Button onClick={toggle}>ASDASDASD</Button> */}
      <Box onClick={toggle} className={classes.container}>
        <Box className={classes.content}>
          <Badge className={classes.badge}>{totalCartLenght}</Badge>

          <Text className={classes.noWrapContainer}>Till varukorg</Text>
        </Box>
        <Box className={classes.noWrapContainer}>{totalCartPrice} :-</Box>
      </Box>
      <Drawer
        opened={opened}
        onClose={toggle}
        padding='xl'
        withCloseButton={true}
        size='xs'
        position='right'
        title={<Title order={5}>Din beställning</Title>}
      >
        <Box className={classes.container2}>
          <CheckoutTag />
          {/* {cart.map((item, i) => (
            <CartCard key={i} item={item} />
          ))} */}
          <CartCard />
        </Box>
      </Drawer>
    </Box>
  );
}
