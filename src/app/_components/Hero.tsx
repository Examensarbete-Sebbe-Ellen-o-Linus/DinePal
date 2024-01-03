/* eslint-disable @typescript-eslint/prefer-optional-chain */

import { fetchHomePageData } from '~/server/sanity/sanity.utils';
import { type IHomePage } from '../interfaces';

export default async function Hero() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const homePageData: IHomePage = await fetchHomePageData();
  const { hero } = homePageData;

  return (
    <section>
      <h1>{hero.title}</h1>
      {hero.description && <p>{hero.description}</p>}
      {hero.image && <img src={hero.image.url} alt={hero.image.alt}></img>}
      {hero.buttons &&
        hero.buttons.map((button, i) => <button key={i}>{button.text}</button>)}
    </section>
  );
}
