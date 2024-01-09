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
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='7'
          height='5'
          viewBox='0 0 7 5'
          fill='none'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M3.17575 0.801235C3.35474 0.622245 3.64494 0.622245 3.82393 0.801235L6.57393 3.55123C6.75292 3.73023 6.75292 4.02043 6.57393 4.19942C6.39494 4.37841 6.10474 4.37841 5.92575 4.19942L3.49984 1.77351L1.07393 4.19942C0.894938 4.37841 0.604737 4.37841 0.425747 4.19942C0.246756 4.02043 0.246756 3.73023 0.425747 3.55123L3.17575 0.801235Z'
            fill='#F5F5F1'
          />
        </svg>
      </button>
    </>
  );
};
