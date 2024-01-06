/* eslint-disable @next/next/no-img-element */
import { Box, Container } from '@mantine/core';
import Link from 'next/link';
import { getServerAuthSession } from '~/server/auth';
import {
  fetchHomePageData,
  fetchSettingsData,
} from '~/server/sanity/sanity.utils';
import About from './_components/about/About';
import Cart from './_components/cart/Cart';
import Hero from './_components/hero/Hero';
import ImageSection from './_components/imageSection/ImageSection';
import News from './_components/news/News';
import SelectedDishes from './_components/selectedDishes/SelectedDishes';

export default async function Home() {
  const session = await getServerAuthSession();
  const homePageData = await fetchHomePageData();
  const settingsData = await fetchSettingsData();

  const { about, selectedDishes, imageSection, hero, news } = homePageData;
  const { header, footer } = settingsData;

  return (
    <Box>
      <Container size={'1120px'}>
        <Link href='/gallery'>Link to Gallery</Link>
        <Cart />
        <Hero hero={hero} />
        <SelectedDishes dishes={selectedDishes} />
        <News news={news} />
      </Container>
      <ImageSection imageSection={imageSection} />
      <About about={about} />
      <div>
        <p>{session && <span>Logged in as {session.user?.name}</span>}</p>
        <Link href={session ? '/api/auth/signout' : '/api/auth/signin'}>
          {session ? 'Sign out' : 'Sign in'}
        </Link>
      </div>
    </Box>
  );
}
