import { Badge, Box, Text } from '@mantine/core';

import { useCart } from 'context/cartContext';
import { formatPrice } from '~/app/formatPrice';
import classes from './CartTag.module.css';

interface ICartTag {
  className?: string;
  itemCount: number;
}

export default function CartTag({ className = '', itemCount }: ICartTag) {
  const { cartPrice } = useCart();

  if (itemCount > 0) {
    return (
      <Box className={`${classes.container} ${className}`}>
        <Box className={classes.content}>
          <Badge className={classes.badge}>{itemCount}</Badge>

          <Text className={classes.noWrapContainer}>Till varukorg</Text>
        </Box>
        <Box className={classes.noWrapContainer}>
          {formatPrice(cartPrice)}:-
        </Box>
      </Box>
    );
  }

  return null;
}
