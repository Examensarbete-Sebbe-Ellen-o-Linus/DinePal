import { fetchHomePageData } from "../../../../server/sanity/sanity.utils";

export default async function Hero() {
  const homePageData = await fetchHomePageData();
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
