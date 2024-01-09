import { Badge, Box, Text } from '@mantine/core';

import { useCart } from 'context/cartContext';
import Link from 'next/link';
import classes from './CheckoutTag.module.scss';

interface ICheckoutTag {
  className?: string;
}

export default function CheckoutTag({ className = '' }: ICheckoutTag) {
  const { cartLenght } = useCart();
  // Adds a blank space between every thousand.
  function formatPrice(price: number): string {
    return price.toLocaleString('sv-SE');
  }
  return (
    <Link href='/checkout'>
      <Box className={`${classes.container} ${className}`}>
        <Box className={classes.content}>
          <Badge className={classes.badge}>{cartLenght}</Badge>

          <Text className={classes.noWrapContainer}>Till kassa</Text>
        </Box>
        <Box className={classes.noWrapContainer}>100 :-</Box>
      </Box>
    </Link>
  );
}
