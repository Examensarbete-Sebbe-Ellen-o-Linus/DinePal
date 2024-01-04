import { computed, signal } from '@preact/signals-react';
import type { IDish } from '~/app/interfaces';

type CartItem = {
  dish: IDish;
  quantity: number;
};

const localStorageValue = localStorage.getItem('cart');

export const cartValue = signal<CartItem[]>(
  localStorageValue ? JSON.parse(localStorageValue) : []
);

export const totalCartLenght = computed(() => {
  let total = 0;
  cartValue.value.forEach(item => {
    total += item.quantity;
  });
  return total;
});
