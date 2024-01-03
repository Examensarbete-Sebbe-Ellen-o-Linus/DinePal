import { Badge, Box, Text } from '@mantine/core';

import Link from 'next/link';
import classes from './CartTag.module.css';

interface ICartTag {
  className?: string;
  itemCount: number;
  price: number;
}

export default function CartTag({
  className = '',
  itemCount,
  price,
}: ICartTag) {
  if (itemCount > 0) {
    return (
      <Link href="/checkout">
        <Box className={`${classes.container} ${className}`}>
          <Box className={classes.content}>
            <Badge className={classes.badge}>{itemCount}</Badge>

            <Text className={classes.noWrapContainer}>Till varukorg</Text>
          </Box>
          <Box className={classes.noWrapContainer}>{price} :-</Box>
        </Box>
      </Link>
    );
  }

  return null;
}
