import { Text } from '@mantine/core';
import { useCart } from 'context/cartContext';
import { cartSignal } from 'signals/cartSignals';
import type { IDish } from '~/app/interfaces';
import classes from './removeFromCart.module.css';

type CartItem = {
  dish: IDish;
  quantity: number;
};

type Props = {
  dish: IDish;
};

export const RemoveFromCartButton = ({ dish }: Props) => {
  const { cartState, setCartState } = useCart();
  if (localStorage.getItem('cart')) {
    cartSignal.value = JSON.parse(localStorage.getItem('cart') ?? '[]');
  }

  const handleRemoveFromCart = (dishTitle: string) => {
    cartSignal.value = cartSignal.value.reduce((newCart, item) => {
      if (item.dish.title === dishTitle) {
        if (item.quantity > 1) {
          newCart.push({ ...item, quantity: item.quantity - 1 });
        }
      } else {
        newCart.push(item);
      }
      // setCartState(newCart);
      return newCart;
    }, [] as CartItem[]);

    setCartState(cartSignal.value);
    localStorage.setItem('cart', JSON.stringify(cartSignal.value));
  };

  return (
    <>
      {/* <Button onClick={() => handleRemoveFromCart(dish.title)}>
        Remove ❌
      </Button> */}
      <Text
        className={classes.cartButton}
        onClick={() => handleRemoveFromCart(dish.title)}
      >
        -
      </Text>
    </>
  );
};
