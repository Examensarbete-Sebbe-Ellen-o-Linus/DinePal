/* eslint-disable @next/next/no-img-element */
import { Box } from '@mantine/core';
import { fetchHomePageData } from '~/server/sanity/sanity.utils';
import About from './_components/about/About';
import Hero from './_components/hero/Hero';
import ImageSection from './_components/imageSection/ImageSection';
import News from './_components/news/News';
import SelectedDishes from './_components/selectedDishes/SelectedDishes';

export default async function Home() {
  const homePageData = await fetchHomePageData();

  const { about, selectedDishes, imageSection, hero, news } = homePageData;

  return (
    <Box>
      <Hero hero={hero} />
      <SelectedDishes dishes={selectedDishes} />
      <News news={news} />
      <ImageSection imageSection={imageSection} />
      <About about={about} />
    </Box>
  );
}
