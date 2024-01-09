'use client';
import { Box, Burger, Drawer, Image, Title } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { type IHeader } from '~/app/interfaces';
import { theme } from '~/app/theme/theme';
import CartTag from '../cartTag/CartTag';
import classes from './Header.module.scss';

export default function Header({ header }: { header: IHeader }) {
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
        <Image src={header.logotype.url} alt={header.logotype.alt} />
      </Link>
      <Box className={classes.content}>
        {/* Will be controlled by signals later on */}
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
          <Box className={classes.drawerContainer}>
            {header.navLinks?.map(navLink => (
              <React.Fragment key={navLink._key}>
                {navLink.pageType === 'about' ? (
                  <Link href={`/#${navLink.pageType}`} onClick={closeDrawer}>
                    <Title className={classes.link} order={6}>
                      {navLink.text}
                    </Title>
                  </Link>
                ) : (
                  <Link href={`/${navLink.pageType}`} onClick={closeDrawer}>
                    <Title className={classes.link} order={6}>
                      {navLink.text}
                    </Title>
                  </Link>
                )}
              </React.Fragment>
            ))}
          </Box>
        </Drawer>

        {!isDesktop ? (
          <CartTag className={classes.bottomPosition} itemCount={0} price={0} />
        ) : null}
      </Box>
    </Box>
  );
}
