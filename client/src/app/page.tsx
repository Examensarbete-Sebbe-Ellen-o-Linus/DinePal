import Link from "next/link";
import { fetchHomePageData } from "../../../server/sanity/sanity.utils";
import Hero from "./components/Hero";
import SelectedDishes from "./components/SelectedDishes";
import { IHomePage } from "./interfaces";

export default async function Home() {
  const homePageData: IHomePage = await fetchHomePageData();
  const { selectedDishes } = homePageData;

  // Render loading state if data is not yet fetched
  if (!homePageData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link href="/gallery">Link to Gallery</Link>
      <Hero />
      <SelectedDishes products={selectedDishes} />
    </div>
  );
}
