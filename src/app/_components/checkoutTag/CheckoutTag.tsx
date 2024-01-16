import { Badge, Box, Text } from '@mantine/core';

import { useCart } from 'context/cartContext';
import Link from 'next/link';
import classes from './CheckoutTag.module.scss';
import { formatPrice } from '~/app/formatPrice';

interface ICheckoutTag {
  className?: string;
}

export default function CheckoutTag({ className = '' }: ICheckoutTag) {
  const { cartLenght, cartPrice } = useCart();

  return (
    <Link href='/checkout'>
      <Box className={`${classes.container} ${className}`}>
        <Box className={classes.content}>
          <Badge className={classes.badge}>{cartLenght}</Badge>

          <Text className={classes.noWrapContainer}>Till kassa</Text>
        </Box>
        <Box className={classes.noWrapContainer}>
          {formatPrice(cartPrice)} :-
        </Box>
      </Box>
    </Link>
  );
}
