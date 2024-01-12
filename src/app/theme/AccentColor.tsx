'use client';

import { useEffect, useState } from 'react';
import { fetchAccentColor } from '~/server/sanity/sanity.utils';
import { generateColorShades } from './generateColorShades';

export default function AccentColor() {
  const [accentColor, setAccentColor] = useState('#FF5B00');

  useEffect(() => {
    async function loadAccentColor() {
      const color = await fetchAccentColor();
      if (color) {
        setAccentColor(color.value); // Store the fetched color

        const colorShades = generateColorShades(color.value);

        console.log(colorShades);
        // Update CSS variables for each color shade
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

  // Display the fetched color for testing purposes
  return <></>;
}

// export function generateColorShades(
//   accentColor: string
// ): [
//   string,
//   string,
//   string,
//   string,
//   string,
//   string,
//   string,
//   string,
//   string,
//   string,
// ] {
//   return [
//     lighten(0.3, accentColor),
//     lighten(0.2, accentColor),
//     lighten(0.1, accentColor),
//     accentColor,
//     darken(0.1, accentColor),
//     darken(0.2, accentColor),
//     darken(0.3, accentColor),
//     darken(0.4, accentColor),
//     darken(0.5, accentColor),
//     darken(0.6, accentColor),
//   ];
// }
