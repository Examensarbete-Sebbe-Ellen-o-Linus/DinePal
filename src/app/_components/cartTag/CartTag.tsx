import { Badge, Box, Text } from '@mantine/core';

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
  // Adds a blank space between every thousand
  function formatPrice(price: number): string {
    return price.toLocaleString('sv-SE');
  }

  if (itemCount > 0) {
    return (
      <Box className={`${classes.container} ${className}`}>
        <Box className={classes.content}>
          <Badge className={classes.badge}>{itemCount}</Badge>

          <Text className={classes.noWrapContainer}>Till varukorg</Text>
        </Box>
        <Box className={classes.noWrapContainer}>{formatPrice(price)} :-</Box>
      </Box>
    );
  }

  return null;
}
