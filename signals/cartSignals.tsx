import { computed, signal } from '@preact/signals-react';
import type { IDish } from '~/app/interfaces';

type CartItem = {
  dish: IDish;
  quantity: number;
};

const localStorageValue = localStorage.getItem('cart');

export const cartSignal = signal<CartItem[]>(
  localStorageValue ? JSON.parse(localStorageValue) : []
);

export const totalCartLenght = computed(() => {
  let total = 0;
  cartSignal.value.forEach(item => {
    total += item.quantity;
  });
  return total;
});
