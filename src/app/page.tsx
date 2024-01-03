import Link from 'next/link';

import { getServerAuthSession } from '~/server/auth';

import { fetchHomePageData } from '~/server/sanity/sanity.utils';
import Hero from './_components/Hero';
import SelectedDishes from './_components/SelectedDishes';
import { type IHomePage } from './interfaces';

export default async function Home() {
  const session = await getServerAuthSession();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const homePageData: IHomePage = await fetchHomePageData();
  const { selectedDishes } = homePageData;

  return (
    <div>
      <Link href='/gallery'>Link to Gallery</Link>
      <Hero />
      <SelectedDishes products={selectedDishes} />

      <div>
        <p>{session && <span>Logged in as {session.user?.name}</span>}</p>
        <Link href={session ? '/api/auth/signout' : '/api/auth/signin'}>
          {session ? 'Sign out' : 'Sign in'}
        </Link>
      </div>
    </div>
  );
}
