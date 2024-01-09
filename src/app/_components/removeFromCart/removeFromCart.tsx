import { Text } from '@mantine/core';
import { useCart } from 'context/cartContext';
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
  // if (localStorage.getItem('cart')) {
  //   cartSignal.value = JSON.parse(localStorage.getItem('cart') ?? '[]');
  // }

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
