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
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='11'
          height='11'
          viewBox='0 0 11 11'
          fill='none'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M2.42575 3.80123C2.60474 3.62224 2.89494 3.62224 3.07393 3.80123L5.49984 6.22714L7.92575 3.80123C8.10474 3.62224 8.39494 3.62224 8.57393 3.80123C8.75292 3.98023 8.75292 4.27043 8.57393 4.44942L5.82393 7.19942C5.64494 7.37841 5.35474 7.37841 5.17575 7.19942L2.42575 4.44942C2.24676 4.27043 2.24676 3.98023 2.42575 3.80123Z'
            fill='#F5F5F1'
          />
        </svg>
      </button>
    </>
  );
};
