'use client';

import { useEffect } from 'react';
import { fetchAccentColor } from '~/server/sanity/sanity.utils';
import { generateColorShades } from './generateColorShades';

export default function AccentColor() {
  useEffect(() => {
    async function loadAccentColor() {
      const color = await fetchAccentColor();
      if (color) {
        const colorShades = generateColorShades(color.value);
        colorShades.forEach((shade, index) => {
          document.documentElement.style.setProperty(
            `--mantine-color-orange-${index}`,
            shade
          );
        });
      }
    }
    void loadAccentColor();
  }, []);

  return <></>;
}
