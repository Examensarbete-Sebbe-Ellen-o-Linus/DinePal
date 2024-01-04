import { Button } from '@mantine/core';
import { cartValue } from 'signals/cartSignals';
import type { IDish } from '~/app/interfaces';

type CartItem = {
  dish: IDish;
  quantity: number;
};

type Props = {
  dish: IDish;
};

export const RemoveFromCartButton = ({ dish }: Props) => {
  if (localStorage.getItem('cart')) {
    cartValue.value = JSON.parse(localStorage.getItem('cart') ?? '[]');
  }

  const handleRemoveFromCart = (dishTitle: string) => {
    cartValue.value = cartValue.value.reduce((newCart, item) => {
      if (item.dish.title === dishTitle) {
        if (item.quantity > 1) {
          newCart.push({ ...item, quantity: item.quantity - 1 });
        }
      } else {
        newCart.push(item);
      }
      return newCart;
    }, [] as CartItem[]);

    localStorage.setItem('cart', JSON.stringify(cartValue.value));
  };

  return (
    <>
      <Button onClick={() => handleRemoveFromCart(dish.title)}>
        Remove ❌
      </Button>
    </>
  );
};
