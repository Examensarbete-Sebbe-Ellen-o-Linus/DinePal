import Link from 'next/link';
import { getServerAuthSession } from '~/server/auth';
import { fetchHomePageData } from '~/server/sanity/sanity.utils';
import About from './_components/about/About';
import Hero from './_components/hero/Hero';
import ImageSection from './_components/imageSection/ImageSection';
import SelectedDishes from './_components/selectedDishes/SelectedDishes';

export default async function Home() {
  const session = await getServerAuthSession();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const homePageData = await fetchHomePageData();

  const { about, selectedDishes, imageSection, hero } = homePageData;

  return (
    <div>
      <Link href='/gallery'>Link to Gallery</Link>
      <Hero hero={hero} />
      <SelectedDishes dishes={selectedDishes} />
      <About about={about} />
      <ImageSection imageSection={imageSection} />
      <div>
        <p>{session && <span>Logged in as {session.user?.name}</span>}</p>
        <Link href={session ? '/api/auth/signout' : '/api/auth/signin'}>
          {session ? 'Sign out' : 'Sign in'}
        </Link>
      </div>
    </div>
  );
}
