'use client';

import { Box, Container, Title } from '@mantine/core';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { type IPromo } from '~/app/interfaces';
import { fetchMenuPageData } from '~/server/sanity/sanity.utils';
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

  if (!error) {
    return (
      <Box className={scss.container}>
        <Container size={1120}>
          {promo && (
            <>
              <Title order={6} className={scss.text}>
                {promo.text}
              </Title>
              <Link href={`/${promo.button?.pageType}`}>
                {promo.button?.text}
              </Link>
            </>
          )}
        </Container>
      </Box>
    );
  }
}
