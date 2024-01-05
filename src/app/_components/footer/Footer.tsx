import { Box, Image, Text, Title } from '@mantine/core';

import { type IFooter } from '~/app/interfaces';
import classes from './Footer.module.scss';

export default function Footer({ footer }: { footer: IFooter }) {
  return (
    <Box>
      <Box className={classes.preFooter}>
        <Image
          className={classes.image}
          src={footer.preFooter.url}
          alt={footer.preFooter.alt}
        />
      </Box>

      <Box className={classes.container}>
        <Box className={classes.upperContainer}>
          <Box className={classes.contentContainer}>
            <Title order={4}>Öppettider</Title>

            {footer.openingHours.map(openingHour => (
              <Box key={openingHour._key} className={classes.openingHourRow}>
                <Text>{`${openingHour.day}:`}</Text>
                <Text>{openingHour.hours}</Text>
              </Box>
            ))}
          </Box>

          <img
            className={classes.logotype}
            src={footer.logotype.url}
            alt={footer.logotype.alt}
          />

          <Box className={classes.contentContainer}>
            <Title order={4}>Kontakt</Title>
            <Box className={classes.content}>
              <Text>{footer.address.street}</Text>
            </Box>
            <Box className={classes.content}>
              <Text>{footer.address.postalCode}</Text>
            </Box>
            <Box className={classes.content}>
              <Text>{footer.phone}</Text>
            </Box>
            <Box className={classes.content}>
              <Text>{footer.email}</Text>
            </Box>
          </Box>
        </Box>

        <Box className={classes.lowerContainer}>
          <Text className={classes.copyRight}>©2024 Dine Pal</Text>
          <Box className={classes.socialMedia}>
            {footer.socials.map(social => (
              <a
                key={social._key}
                href={social.url}
                target='_blank'
                rel='noopener noreferrer'
              >
                <img src={social.icon.url} alt={`${social.platform} icon`} />
              </a>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
