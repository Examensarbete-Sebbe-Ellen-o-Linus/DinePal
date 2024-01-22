import { Badge, Box, Text } from '@mantine/core';

import { useCart } from 'context/cartContext';
import Link from 'next/link';
import { formatPrice } from '~/app/formatPrice';
import classes from './CheckoutTag.module.scss';

interface ICheckoutTag {
  className?: string;
  onClick: () => void;
}

export default function CheckoutTag({ className = '', onClick }: ICheckoutTag) {
  const { cartLenght, cartPrice } = useCart();

  function handleOnClick() {
    if (onClick) {
      onClick();
    }
  }

  return (
    <Link href='/checkout'>
      <Box
        className={`${classes.container} ${className}`}
        onClick={handleOnClick}
      >
        <Box className={classes.content}>
          <Badge className={classes.badge}>{cartLenght}</Badge>

          <Text className={classes.noWrapContainer}>Till kassa</Text>
        </Box>
        <Box className={classes.noWrapContainer}>
          {formatPrice(cartPrice)}:-
        </Box>
      </Box>
    </Link>
  );
}
