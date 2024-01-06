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
      <News news={news} />
      <ImageSection imageSection={imageSection} />
      <About about={about} />
      <div>
        <p>{session && <span>Logged in as {session.user?.name}</span>}</p>
        <Link href={session ? '/api/auth/signout' : '/api/auth/signin'}>
          {session ? 'Sign out' : 'Sign in'}
        </Link>
      </div>

      {footer && (
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
      )}
      {header && (
        <>
          <img src={header.logotype.url} alt={header.logotype.alt} />
          {header.navLinks.map(link => (
            <a key={link._key} href={link.pageType}>
              {link.text}
            </a>
          ))}
        </>
      )}
    </div>
  );
}
