import { computed, effect, signal } from '@preact/signals-react';
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
export const cartSignal = signal<CartItem[]>(getCartFromLS());

effect(() => {
  localStorage.setItem('cart', JSON.stringify(cartSignal.value));
});

export const totalCartLenght = computed(() => {
  let total = 0;
  cartSignal.value.forEach(item => {
    total += item.quantity;
  });
  return total;
});

export const totalCartPrice = computed(() => {
  let total = 0;
  cartSignal.value.forEach(item => {
    total += item.dish.price * item.quantity;
  });
  return total;
});

// export const signalsArray = signal<hejArr[]>(
//   localStorage.getItem('signalsArray')
//     ? JSON.parse(localStorage.getItem('signalsArray') as string)
//     : [{ name: 'hej' }]
// );
