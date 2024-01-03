'use client';
import { Box, Burger } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';

import Image from 'next/image';
import Link from 'next/link';
import { theme } from '~/app/theme/theme';
import logotype from '../../../../public/images/bellis-logo.png';
import CartTag from '../cartTag/CartTag';
import classes from './Header.module.css';

export default function Header() {
  const [opened, { toggle }] = useDisclosure();
  const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints?.sm})`);
  return (
    <Box className={classes.container}>
      <Link href='/'>
        <Image
          src={logotype}
          alt="A logotype of the Bellis café. The letter 'B' in a golden banner."
        />
      </Link>
      <Box className={classes.content}>
        {/* Will be controlled by states later on */}
        {isDesktop ? <CartTag itemCount={0} price={0} /> : null}
        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          aria-label='Toggle navigation'
        />
        {!isDesktop ? (
          <CartTag className={classes.bottomPosition} itemCount={0} price={0} />
        ) : null}
      </Box>
    </Box>
  );
}
