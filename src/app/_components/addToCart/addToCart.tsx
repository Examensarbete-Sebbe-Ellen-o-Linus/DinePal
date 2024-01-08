import { Text } from '@mantine/core';
import { useCart } from 'context/cartContext';
import { cartSignal } from 'signals/cartSignals';
import type { IDish } from '~/app/interfaces';
import classes from './addToCart.module.css';

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
    const ItemInCart = cartSignal.value.find(
      item => item.dish.title === newDish.title
    );

    if (!ItemInCart) {
      cartSignal.value = [...cartSignal.value, { dish: newDish, quantity: 1 }];
      setCartState(cartSignal.value);
    } else {
      // +1 to quantity of item in cart
      const newSignal = cartSignal.value.reduce((newCart, item) => {
        if (item.dish.title === newDish.title) {
          newCart.push({ ...item, quantity: item.quantity + 1 });
        } else {
          newCart.push(item);
        }
        return newCart;
      }, [] as CartItem[]);
      cartSignal.value = newSignal;
      setCartState(newSignal);
    }
  };

  return (
    <>
      <Text
        className={classes.cartButton}
        onClick={() => handleAddToCart(dish)}
      >
        +
      </Text>
    </>
  );
};
