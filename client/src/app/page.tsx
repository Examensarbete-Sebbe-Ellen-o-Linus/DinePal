import Link from "next/link";
import { fetchHomePageData } from "../../../server/sanity/sanity.utils";
import About from "./components/About";
import Hero from "./components/Hero";
import ImageSection from "./components/ImageSection";
import SelectedDishes from "./components/SelectedDishes";

export default async function Home() {
  const homePageData = await fetchHomePageData();

  // Render loading state if data is not yet fetched
  if (!homePageData) {
    return <div>Loading...</div>;
  }

  const { about, selectedDishes, imageSection, hero } = homePageData;

  return (
    <div>
      <Link href="/gallery">Link to Gallery</Link>
      <Hero hero={hero} />
      <SelectedDishes dishes={selectedDishes} />
      <About about={about} />
      <ImageSection imageSection={imageSection} />
    </div>
  );
}
