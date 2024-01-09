import type { IDish } from '~/app/interfaces';

export type CartItem = {
  dish: IDish;
  quantity: number;
};

export const getCartFromLS = () => {
  const value = localStorage.getItem('cart');
  if (value === null) return [];
  return JSON.parse(value);
};

export const getCartLenghtFromLS = () => {
  let total = 0;
  const value = localStorage.getItem('cart');
  if (value === null) return 0;
  JSON.parse(value).forEach((item: CartItem) => {
    total += item.quantity;
  });
  return total;
};

export const getCartPriceFromLS = () => {
  let total = 0;
  const value = localStorage.getItem('cart');
  if (value === null) return 0;
  JSON.parse(value).forEach((item: CartItem) => {
    total += item.dish.price * item.quantity;
  });
  return total;
};
