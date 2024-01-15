import { Box, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { type IImage } from '~/app/interfaces';
import { fetchSettingsData } from '~/server/sanity/sanity.utils';
import scss from './placeholder.module.scss';

export default function Placeholder() {
  const [logo, setLogo] = useState<IImage | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const settingsData = fetchSettingsData();
        const { footer } = await settingsData;
        setLogo(footer.logotype);
      } catch (err) {
        console.error;
      }
    };
    void fetchData();
  }, []);

  return (
    <Box className={scss.placeholder}>
      <Box className={scss.inner}>
        <img src={logo?.url} alt={logo?.alt}></img>
        <Title order={6}>Bild kommer snart</Title>
      </Box>
    </Box>
  );
}
