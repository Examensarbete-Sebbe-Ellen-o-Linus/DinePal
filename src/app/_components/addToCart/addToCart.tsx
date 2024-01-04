import { Button } from '@mantine/core';
import { effect } from '@preact/signals-react';
import { cartSignal } from 'signals/cartSignals';
import type { IDish } from '~/app/interfaces';

type CartItem = {
  dish: IDish;
  quantity: number;
};

type Props = {
  dish: IDish;
};

export const AddToCartButton = ({ dish }: Props) => {
  const handleAddToCart = (newDish: IDish) => {
    cartSignal.value = cartSignal.value.reduce((newCart, item) => {
      if (item.dish.title === newDish.title) {
        newCart.push({ ...item, quantity: item.quantity + 1 });
      } else {
        newCart.push(item);
      }
      return newCart;
    }, [] as CartItem[]);

    // If the dish is not already in the cart, add it
    if (!cartSignal.value.some(item => item.dish.title === newDish.title)) {
      cartSignal.value = [...cartSignal.value, { dish: newDish, quantity: 1 }];
    }

    localStorage.setItem('cart', JSON.stringify(cartSignal.value));
  };

  effect(() => {
    localStorage.setItem('cart', JSON.stringify(cartSignal.value));
    console.log('cart', cartSignal.value);
  });

  return (
    <>
      <Button onClick={() => handleAddToCart(dish)}>Add to 🛒</Button>
    </>
  );
};
