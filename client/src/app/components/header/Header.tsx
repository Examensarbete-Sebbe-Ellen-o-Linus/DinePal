import { Box, Burger } from '@mantine/core';

import logotype from '../../../../public/images/bellis-logo.png';
import CartTag from '../cartTag/CartTag';
import classes from './Header.module.css';

export default function Header() {
  return (
    <Box className={classes.container}>
      <img
        src={logotype.src}
        alt="A logotype of the Bellis café. The letter 'B' in a golden banner."
      />
      <Box className={classes.content}>
        <CartTag />
        <Burger className={classes.burger} aria-label="Toggle navigation" />
      </Box>
    </Box>
  );
}
