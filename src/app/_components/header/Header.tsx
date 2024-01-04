'use client';
import { Box, Burger, Drawer, Title } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { theme } from '~/app/theme/theme';
import logotype from '../../../../public/images/bellis-logo.png';
import CartTag from '../cartTag/CartTag';
import classes from './Header.module.css';

export default function Header() {
  const [opened, { toggle }] = useDisclosure();
  const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints?.sm})`);
  const [lastScrollUp, setLastScrollUp] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollUp = window.scrollY || document.documentElement.scrollTop;
      if (scrollUp > lastScrollUp) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }
      setLastScrollUp(scrollUp <= 0 ? 0 : scrollUp);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollUp]);

  const closeDrawer = () => {
    if (opened) {
      toggle();
    }
  };

  return (
    <Box
      className={`${classes.container} ${!headerVisible ? classes.hide : ''}`}
    >
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

        <Drawer
          opened={opened}
          onClose={toggle}
          padding='xl'
          withCloseButton={false}
          size='xs'
          position='top'
        >
          <Box className={classes.drawer}>
            <Link href='/' onClick={closeDrawer}>
              <Title className={classes.link} order={6}>
                Hem
              </Title>
            </Link>
            <Link href='/menu' onClick={closeDrawer}>
              <Title className={classes.link} order={6}>
                Meny
              </Title>
            </Link>
            <Link href='/booking' onClick={closeDrawer}>
              <Title className={classes.link} order={6}>
                Boka bord
              </Title>
            </Link>
            <Link href='/gallery' onClick={closeDrawer}>
              <Title className={classes.link} order={6}>
                Galleri
              </Title>
            </Link>
            <Link href='/chart' onClick={closeDrawer}>
              <Title className={classes.link} order={6}>
                Varukorg
              </Title>
            </Link>
          </Box>
        </Drawer>

        {!isDesktop ? (
          <CartTag className={classes.bottomPosition} itemCount={0} price={0} />
        ) : null}
      </Box>
    </Box>
  );
}
