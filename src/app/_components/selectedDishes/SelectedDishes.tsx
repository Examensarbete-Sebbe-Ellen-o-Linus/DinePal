'use client';

import { AddToCartButton } from '~/app/_components/addToCart/addToCart';

import { Text } from '@mantine/core';
import Link from 'next/link';
import { RemoveFromCartButton } from '~/app/_components/removeFromCart/removeFromCart';

import { totalCartLenght } from 'signals/cartSignals';
import type { IDish } from '../../interfaces';

export default function SelectedDishes({ dishes }: { dishes: IDish[] }) {
  // const totalCartLenght = computed(() => {
  //   let total = 0;
  //   cartValue.value.forEach(item => {
  //     total += item.quantity;
  //   });
  //   return total;
  // });

  return (
    <section>
      <h3>Example how to display selected Dishes</h3>
      {dishes &&
        dishes.map((dish, i) => (
          <div key={i}>
            <h4>{dish.title}</h4>
            <p>{dish.description}</p>
            {dish.image && <img src={dish.image.url} alt={dish.image.alt} />}
            {dish.tags &&
              dish.tags.map((tag, index) => (
                <span key={index} className='tag'>
                  {tag.label}
                </span>
              ))}

            <AddToCartButton dish={dish} />
            <RemoveFromCartButton dish={dish} />
            <Text>{totalCartLenght}</Text>

            {dish.slug && dish.slug.current && (
              <li>
                <Link key={i} href={`/product/${dish.slug.current}`}>
                  {dish.title}
                </Link>
              </li>
            )}
          </div>
        ))}
    </section>
  );
}
