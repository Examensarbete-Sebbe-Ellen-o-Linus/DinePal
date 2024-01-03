import { createTheme } from '@mantine/core';

export const theme = createTheme({
  colors: {
    white: [
      '#FEFEFE', //0
      '#FEFEFD', //1
      '#FCFCFB', //2
      '#F5F5F1', //3 - Main
      '#DDDDD9', //4
      '#C4C4C1', //5
      '#B8B8B5', //6
      '#939391', //7
      '#6E6E6C', //8
      '#565654', //9
    ],
    black: [
      '#E9E9E9', //0
      '#DEDDDD', //1
      '#BABABA', //2
      '#221F1F', //3 - Main
      '#1F1C1C', //4
      '#1B1919', //5
      '#1A1717', //6
      '#141313', //7
      '#0F0E0E', //8
      '#0C0B0B', //9
    ],
    orange: [
      '#FFEFE6', //0
      '#FFE6D9', //1
      '#FFCCB0', //2
      '#FF5B00', //3 - Main
      '#E65200', //4
      '#CC4900', //5
      '#BF4400', //6
      '#993700', //7
      '#732900', //8
      '#592000', //9
    ],
  },
  fontFamily: 'Montserrat',

  headings: {
    sizes: {
      h1: {
        lineHeight: '1.3',
        fontWeight: '400',
        fontSize: '69px',
      },
      h2: {
        lineHeight: '1.3',
        fontWeight: '400',
        fontSize: '55px',
      },
      h3: {
        lineHeight: '1.3',
        fontWeight: '400',
        fontSize: '44px',
      },
      h4: {
        lineHeight: '1.3',
        fontWeight: '400',
        fontSize: '35px',
      },
      h5: {
        lineHeight: '1.3',
        fontWeight: '400',
        fontSize: '28px',
      },
      h6: {
        lineHeight: '1.3',
        fontWeight: '400',
        fontSize: '23px',
      },
    },
  },
  other: {
    body1: '18px',
    body2: '14px',
  },
  shadows: {
    primary: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    secondary: '0 2px 4px 0 rgba(0, 0, 0, 0.15)',
  },
  radius: {
    primary: '4px',
    secondary: '8px',
  },
});
