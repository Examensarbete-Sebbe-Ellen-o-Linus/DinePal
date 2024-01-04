import { Button } from '@mantine/core';
import { effect } from '@preact/signals-react';
import { cartValue } from 'signals/cartSignals';
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
    cartValue.value = cartValue.value.reduce((newCart, item) => {
      if (item.dish.title === newDish.title) {
        newCart.push({ ...item, quantity: item.quantity + 1 });
      } else {
        newCart.push(item);
      }
      return newCart;
    }, [] as CartItem[]);

    // If the dish is not already in the cart, add it
    if (!cartValue.value.some(item => item.dish.title === newDish.title)) {
      cartValue.value = [...cartValue.value, { dish: newDish, quantity: 1 }];
    }

    localStorage.setItem('cart', JSON.stringify(cartValue.value));
  };

  effect(() => {
    localStorage.setItem('cart', JSON.stringify(cartValue.value));
    console.log('cart', cartValue.value);
  });

  return (
    <>
      <Button onClick={() => handleAddToCart(dish)}>Add to 🛒</Button>
    </>
  );
};
