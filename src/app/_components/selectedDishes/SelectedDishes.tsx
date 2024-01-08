'use client';

import Link from 'next/link';

import { Text } from '@mantine/core';
import { cartSignal } from 'signals/cartSignals';
import type { IDish } from '../../interfaces';
import { AddToCartButton } from '../addToCart/addToCart';
import { RemoveFromCartButton } from '../removeFromCart/removeFromCart';

export default function SelectedDishes({ dishes }: { dishes: IDish[] }) {
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

            {cartSignal.value.map((item, i) => (
              <div key={i}>
                <span style={{ fontWeight: 'bold' }}>{item.dish.title}</span>
                <span style={{ fontWeight: 'bold' }}>{item.quantity}</span>
              </div>
            ))}

            <AddToCartButton dish={dish} />
            <RemoveFromCartButton dish={dish} />
            <Text> pris: {dish.price} :-</Text>

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
