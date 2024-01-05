/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { getServerAuthSession } from '~/server/auth';
import {
  fetchHomePageData,
  fetchSettingsData,
} from '~/server/sanity/sanity.utils';
import About from './_components/about/About';
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
      <News news={news} />

      {/* {footer && (
        <>
          <div>
            <p>{footer.address?.street}</p>
            <p>{footer.address?.postalCode}</p>
            <p>{footer.address?.city}</p>
          </div>
          <img src={footer.logotype.url} alt={footer.logotype.alt} />
          {footer.socials.map(social => (
            <a key={social._key} href={social.url}>
              {social.url}
            </a>
          ))}
        </>
      )} */}
    </div>
  );
}
