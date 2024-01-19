'use client';
import { Box, Burger, Drawer, Image, Title } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';

import Link from 'next/link';
import React from 'react';
import { theme } from '~/app/_theme/theme';
import { type IHeader } from '~/app/interfaces';
import Cart from '../cart/Cart';
import CartMobile from '../cartMobile/CartMobile';
import classes from './Header.module.scss';

export default function Header({ header }: { header: IHeader }) {
  const [opened, { toggle }] = useDisclosure();
  const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints?.xs})`);

  const closeDrawer = () => {
    if (opened) {
      toggle();
    }
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.contentContainer}>
        <Link href='/'>
          <Image src={header.logotype.url} alt={header.logotype.alt} />
        </Link>
        <Box className={classes.content}>
          {isDesktop ? <Cart /> : <CartMobile />}
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
        </Box>
      </Box>
    </Box>
  );
}
