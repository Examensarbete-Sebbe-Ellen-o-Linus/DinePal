/* eslint-disable @typescript-eslint/no-empty-function */
'use client';

import type { ReactNode } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  getCartFromLS,
  getCartLenghtFromLS,
  type CartItem,
} from 'signals/cartSignals';

interface CartContextType {
  cartState: CartItem[];
  setCartState: React.Dispatch<React.SetStateAction<CartItem[]>>;
  cartLenght: number;
  setCartLenght: React.Dispatch<React.SetStateAction<number>>;
}

// Create context with an empty array and a dummy function as default
const CartContext = createContext<CartContextType>({
  cartState: [],
  setCartState: () => {},
  cartLenght: 0,
  setCartLenght: () => {},
});

// Provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartState, setCartState] = useState<CartItem[]>(getCartFromLS());
  const [cartLenght, setCartLenght] = useState<number>(getCartLenghtFromLS());

  useEffect(() => {
    let total = 0;
    const value = cartState;
    if (!cartState) return;
    value.forEach((item: CartItem) => {
      total += item.quantity;
    });
    setCartLenght(total);
  }, [cartState]);

  return (
    <CartContext.Provider
      value={{ cartState, setCartState, cartLenght, setCartLenght }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook to use the context
export const useCart = () => useContext(CartContext);

// export const totalCartLenght = computed(() => {
//   let total = 0;
//   cartSignal.value.forEach(item => {
//     total += item.quantity;
//   });
//   return total;
// });
