/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { fetchSingleDish } from '~/server/sanity/sanity.utils';

interface Props {
  params: {
    product: string;
  };
}

export default async function Product({ params }: Props) {
  const slug = params.product;
  const dish = await fetchSingleDish(slug);

  return (
    <>
      <h1>{dish.title}</h1>
    </>
  );
}
