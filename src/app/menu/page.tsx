import type { Metadata, ResolvingMetadata } from 'next';
import { fetchDishes, fetchMenuPageData } from '~/server/sanity/sanity.utils';
import MenuContent from '../_components/menuContent/MenuContent';
import Promo from '../_components/promo/Promo';

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const menuPageData = await fetchMenuPageData();
    return {
      title: 'Dinepal - ' + menuPageData.seo.metaTitle,
      description: menuPageData.seo.metaDescription,
    };
  } catch (error) {
    console.log(error);
    return {
      title: 'Dinepal',
    };
  }
}

export default async function Menu() {
  const menu = await fetchMenuPageData();
  const dishes = await fetchDishes();

  return (
    <>
      <MenuContent menu={menu} dishes={dishes} />
      <Promo />
    </>
  );
}
