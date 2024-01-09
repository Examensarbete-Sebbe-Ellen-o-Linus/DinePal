import { Text } from '@mantine/core';
import { useCart } from 'context/cartContext';
import type { CartItem } from 'context/initializers';
import type { IDish } from '~/app/interfaces';
import classes from './removeFromCart.module.css';

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
      <Text
        className={classes.cartButton}
        onClick={() => handleRemoveFromCart(dish.title)}
      >
        -
      </Text>
    </>
  );
};
