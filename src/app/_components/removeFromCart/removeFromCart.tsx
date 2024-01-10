'use client';

import { useCart } from 'context/cartContext';
import type { CartItem } from 'context/initializers';
import type { IDish } from '~/app/interfaces';
import scss from './removeFromCart.module.scss';

type Props = {
  dish: IDish;
};

export const RemoveFromCartButton = ({ dish }: Props) => {
  const { cartState, setCartState } = useCart();

  const handleRemoveFromCart = (dishTitle: string) => {
    const updatedCart = cartState.reduce((newCart, item) => {
      if (item.dish.title === dishTitle) {
        if (item.quantity > 1) {
          newCart.push({ ...item, quantity: item.quantity - 1 });
        }
      } else {
        newCart.push(item);
      }
      return newCart;
    }, [] as CartItem[]);

    setCartState(updatedCart);
  };

  return (
    <>
      <button
        className={scss.cartButton}
        onClick={() => handleRemoveFromCart(dish.title)}
      >
        -
      </button>
    </>
  );
};
