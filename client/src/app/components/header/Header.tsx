'use client';
import { Box, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import logotype from '../../../../public/images/bellis-logo.png';
import CartTag from '../cartTag/CartTag';
import classes from './Header.module.css';

export default function Header() {
  const [opened, { toggle }] = useDisclosure();
  return (
    <Box className={classes.container}>
      <img
        src={logotype.src}
        alt="A logotype of the Bellis café. The letter 'B' in a golden banner."
      />
      <Box className={classes.content}>
        <CartTag />
        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          aria-label="Toggle navigation"
        />
      </Box>
    </Box>
  );
}
