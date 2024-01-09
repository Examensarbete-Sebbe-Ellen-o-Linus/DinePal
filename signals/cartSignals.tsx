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
// export const cartSignal = signal<CartItem[]>(getCartFromLS());

// effect(() => {
//   localStorage.setItem('cart', JSON.stringify(cartSignal.value));
// });

// export const cartLenght2 = signal();

// export const totalCartLenght = () => {
//   let total = 0;
//   cartSignal.value.forEach(item => {
//     total += item.quantity;
//   });
//   return total;
// };

// export const totalCartPrice = computed(() => {
//   let total = 0;
//   cartSignal.value.forEach(item => {
//     total += item.dish.price * item.quantity;
//   });
//   return total;
// });
