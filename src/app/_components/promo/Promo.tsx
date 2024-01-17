'use client';

import { Box, Container, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { type IPromo } from '~/app/interfaces';
import { fetchMenuPageData } from '~/server/sanity/sanity.utils';
import LongButton from '../longButton/LongButton';
import scss from './promo.module.scss';

export default function Promo() {
  const [promo, setPromo] = useState<IPromo | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMenuPageData();
        setPromo(data.promo);
        setError(false);
      } catch (err) {
        setError(true);
        console.error;
      }
    };
    void fetchData();
  }, []);

  return (
    <Box className={scss.container}>
      <Container size={1120}>
        {!error ? (
          promo && (
            <>
              <Title order={6} className={scss.text}>
                {promo.text}
              </Title>
              <LongButton
                text={promo.button?.text ?? 'Default Text'}
                color={'orange'}
                onClick={() =>
                  (window.location.href = `/${promo.button?.pageType}`)
                }
              />
            </>
          )
        ) : (
          <Title order={6}>Kunde inte ladda datan</Title>
        )}
      </Container>
    </Box>
  );
}
