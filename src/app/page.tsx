/* eslint-disable @next/next/no-img-element */
import { Box } from '@mantine/core';
import Link from 'next/link';
import { getServerAuthSession } from '~/server/auth';
import { fetchHomePageData } from '~/server/sanity/sanity.utils';
import About from './_components/about/About';
import Hero from './_components/hero/Hero';
import ImageSection from './_components/imageSection/ImageSection';
import News from './_components/news/News';
import SelectedDishes from './_components/selectedDishes/SelectedDishes';

export default async function Home() {
  const session = await getServerAuthSession();
  const homePageData = await fetchHomePageData();

  const { about, selectedDishes, imageSection, hero, news } = homePageData;

  return (
    <Box>
      <Hero hero={hero} />
      <SelectedDishes dishes={selectedDishes} />
      <News news={news} />
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
