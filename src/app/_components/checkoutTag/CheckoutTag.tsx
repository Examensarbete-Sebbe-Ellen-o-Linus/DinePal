import { Badge, Box, Text } from '@mantine/core';

import Link from 'next/link';
import { totalCartLenght, totalCartPrice } from 'signals/cartSignals';
import classes from './CheckoutTag.module.scss';

interface ICheckoutTag {
  className?: string;
}

export default function CheckoutTag({ className = '' }: ICheckoutTag) {
  // Adds a blank space between every thousand.
  function formatPrice(price: number): string {
    return price.toLocaleString('sv-SE');
  }
  return (
    <Link href='/checkout'>
      <Box className={`${classes.container} ${className}`}>
        <Box className={classes.content}>
          <Badge className={classes.badge}>{totalCartLenght}</Badge>

          <Text className={classes.noWrapContainer}>Till kassa</Text>
        </Box>
        <Box className={classes.noWrapContainer}>{totalCartPrice} :-</Box>
      </Box>
    </Link>
  );
}
