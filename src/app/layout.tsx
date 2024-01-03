/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import '@mantine/core/styles.layer.css';
import '~/styles/globals.css';

import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';

import { MantineProvider } from '@mantine/core';
import { TRPCReactProvider } from '~/trpc/react';
import Header from './_components/header/Header';
import { theme } from './theme/theme';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata = {
  title: 'Create T3 App',
  description: 'Generated by create-t3-app',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <MantineProvider theme={theme}>
            <Header />
            {children}
          </MantineProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
