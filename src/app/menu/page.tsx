import type { Metadata } from 'next';
import { fetchDishes, fetchMenuPageData } from '~/server/sanity/sanity.utils';
import MenuContent from '../_components/menuContent/MenuContent';
import Promo from '../_components/promo/Promo';

export const metadata: Metadata = {
  title: 'Dinepal - Meny',
};

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
