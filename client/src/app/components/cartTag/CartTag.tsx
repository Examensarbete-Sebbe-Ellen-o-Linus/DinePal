import { Badge, Box, Text } from '@mantine/core';

import classes from './CartTag.module.css';

interface ICartTag {
  className?: string;
}

export default function CartTag({ className = '' }: ICartTag) {
  return (
    <Box className={`${classes.container} ${className}`}>
      <Box className={classes.content}>
        {/* Mocked up for now */}
        <Badge className={classes.badge}>5</Badge>
        <Text>Varukorg</Text>
      </Box>
      {/* Mocked up for now */}
      <Box className={classes.priceContainer}>1399,00 :-</Box>
    </Box>
  );
}
