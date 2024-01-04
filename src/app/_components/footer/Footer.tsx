import { Box, Text, Title } from '@mantine/core';

import Image from 'next/image';
import logotype from '../../../../public/images/bellis-logo-footer.png';
import preHeader from '../../../../public/images/brunch-table.png';
import facebook from '../../../../public/images/facebook.png';
import instagram from '../../../../public/images/instagram.png';
import x from '../../../../public/images/x.png';
import classes from './Footer.module.scss';

export default function Footer() {
  return (
    <Box>
      <Box className={classes.imageContainer}>
        <Image
          src={preHeader}
          alt='A brunch table with bottles, cups and some sandwiches.'
        />
      </Box>

      <Box className={classes.container}>
        <Box className={classes.upperContainer}>
          <Box className={classes.contentContainer}>
            <Title order={4}>Öppettider</Title>
            <Box className={classes.content}>
              <Text>Mån-Tors</Text>
              <Text>10:00-16:00</Text>
            </Box>
            <Box className={classes.content}>
              <Text>Fredag</Text>
              <Text>10:00-22:00</Text>
            </Box>
            <Box className={classes.content}>
              <Text>Lördag</Text>
              <Text>10:00-17:00</Text>
            </Box>
            <Box className={classes.content}>
              <Text>Söndag</Text>
              <Text>10:00-17:00</Text>
            </Box>
          </Box>

          <Image
            className={classes.logotype}
            src={logotype}
            alt="A logotype of the Bellis café. The letter 'B' in a golden banner."
          />

          <Box className={classes.contentContainer}>
            <Title order={4}>Kontakt</Title>
            <Box className={classes.content}>
              <Text>Norra Toggatan 9a</Text>
            </Box>
            <Box className={classes.content}>
              <Text>434 30 Kungsbacka</Text>
            </Box>
            <Box className={classes.content}>
              <Text>Tel: 076-3223979</Text>
            </Box>
            <Box className={classes.content}>
              <Text>Epost: info@belliscafe.se</Text>
            </Box>
          </Box>
        </Box>

        <Box className={classes.lowerContainer}>
          <Text className={classes.copyRight}>©2024 Dine Pal</Text>
          <Box className={classes.socialMedia}>
            <Image src={facebook} alt='A logotype of Facebook.' />
            <Image src={instagram} alt='A logotype of Instagram.' />
            <Image src={x} alt='A logotype of X.' />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
