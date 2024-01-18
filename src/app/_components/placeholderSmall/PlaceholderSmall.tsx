import { Box, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { type IImage } from '~/app/interfaces';
import { fetchSettingsData } from '~/server/sanity/sanity.utils';
import scss from './placeholderSmall.module.scss';

export default function PlaceholderSmall({ hover }: { hover?: boolean }) {
  const [logo, setLogo] = useState<IImage | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const settingsData = fetchSettingsData();
        const { header } = await settingsData;
        setLogo(header.logotype);
      } catch (err) {
        console.error;
      }
    };
    void fetchData();
  }, []);

  return (
    <Box className={scss.placeholder}>
      <Box className={scss.inner}>
        <img
          src={logo?.url}
          alt={logo?.alt}
          className={hover ? `${scss.image} ${scss.hover}` : scss.image}
        ></img>
        <Title order={6}>Bild kommer snart</Title>
      </Box>
    </Box>
  );
}
