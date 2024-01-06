'use client';
import { Box, Drawer, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import CartCard from '../cartCard/CartCard';
import CheckoutTag from '../checkoutTag/CheckoutTag';
import classes from './Cart.module.scss';

export default function Cart() {
  const [opened, { toggle }] = useDisclosure();
  return (
    <Box>
      <button onClick={toggle}>Click me</button>
      <Drawer
        opened={opened}
        onClose={toggle}
        padding='xl'
        withCloseButton={true}
        size='xs'
        position='right'
        title={<Title order={5}>Din beställning</Title>}
      >
        <Box className={classes.container}>
          <CheckoutTag itemCount={3} price={22900} />
          <CartCard />
          <CartCard />
          <CartCard />
        </Box>
      </Drawer>
    </Box>
  );
}
