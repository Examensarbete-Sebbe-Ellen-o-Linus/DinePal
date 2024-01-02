import { Badge, Box, Text } from '@mantine/core';

import classes from './CartTag.module.css';

export default function CartTag() {
  return (
    <Box className={classes.container}>
      <Box className={classes.content}>
        {/* Mocked up for now */}
        <Badge className={classes.badge}>5</Badge>
        <Text>Till varukorg</Text>
      </Box>
      {/* Mocked up for now */}
      <Box>1399,00 :-</Box>
    </Box>
  );
}
