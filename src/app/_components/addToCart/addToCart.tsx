'use client';

import { useCart } from 'context/cartContext';
import type { IDish } from '~/app/interfaces';
import scss from './addToCart.module.scss';

type CartItem = {
  dish: IDish;
  quantity: number;
};

type Props = {
  dish: IDish;
};

export const AddToCartButton = ({ dish }: Props) => {
  const { cartState, setCartState } = useCart();
  const handleAddToCart = (newDish: IDish) => {
    const ItemInCart = cartState.find(
      item => item.dish.title === newDish.title
    );

    if (!ItemInCart) {
      // cartSignal.value = [...cartSignal.value, { dish: newDish, quantity: 1 }];
      const updatedCart = [...cartState, { dish: newDish, quantity: 1 }];
      setCartState(updatedCart);
    } else {
      // +1 to quantity of item in cart
      const updatedCart = cartState.reduce((newCart, item) => {
        if (item.dish.title === newDish.title) {
          newCart.push({ ...item, quantity: item.quantity + 1 });
        } else {
          newCart.push(item);
        }
        return newCart;
      }, [] as CartItem[]);
      // cartSignal.value = newSignal;
      setCartState(updatedCart);
    }
  };

  return (
    <>
      <button className={scss.cartButton} onClick={() => handleAddToCart(dish)}>
        +
      </button>
    </>
  );
};
